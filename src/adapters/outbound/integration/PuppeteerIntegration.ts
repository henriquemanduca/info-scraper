import { Browser, Page, WaitForOptions, launch } from 'puppeteer'


export default class PuppeteerIntegration {
    browser?: Browser
    readonly TIMEOUT: number

    constructor(timeout: number = 50000) {
        this.TIMEOUT = timeout
        // For debugging try these Puppeteer Params:
        // headless: true
        // executablePath: PathToCustomChromiumInstall
        // devtools: true
        // slowMo: 2000
    }

    private async release() {
        if (this.browser) {
            await this.browser.close()
        }
    }

    private async start(
        SlowDown: number = 0,
        DevTools: boolean = false
    ): Promise<Browser> {
        this.browser = await launch({
            headless: 'new',
            devtools: DevTools,
            ignoreHTTPSErrors: true,
            slowMo: SlowDown,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
                // '--single-process'
                // '--user-data-dir=./'
            ]
        })

        // Listen to Disconnect event, and restart.
        this.browser.on('disconnected', async () => {
            await this.release()
            if (this.browser !== null && this.browser?.process() !== null) {
                this.browser!.process()!.kill('SIGINT')
            }
            await this.start()
        })

        return this.browser
    }

    private async getInstance(): Promise<Browser> {
        return this.browser ?? await this.start()
    }

    public async nextPage(
        page: Page,
        URL: string
    ): Promise<Page> {
        try {
            await page.goto(URL)
        } catch (error) {
            await page.close()
            throw error
        }

        return page
    }

    public async createPage(
        URL: string,
        options: WaitForOptions = { waitUntil: 'networkidle0' }
    ): Promise<Page> {
        const browserHandler = await this.getInstance()
        const page = await browserHandler.newPage()

        await page.setViewport({
            width: 1920,
            height: 800,
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false
        })

        // await page.setUserAgent(this.USER_AGENT)
        await page.setJavaScriptEnabled(true)
        page.setDefaultNavigationTimeout(this.TIMEOUT)

        // skips css fonts and images for performance and efficiency
        await page.setRequestInterception(true)

        page.on('request', (req) => {
            if (req.resourceType() === 'font' || req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
                req.abort()
            } else {
                req.continue()
            }
        })

        try {
            await page.goto(URL, options)
        } catch (error) {
            await page.close()
            throw error
        }

        return page
    }
}
