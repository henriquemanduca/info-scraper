import numeral from 'numeral'

import log from '@shared/log/index.js'


const NAMESPACE = 'SHARED.UTILS'

export function memoryUsage(nameSpace: string = this.NAMESPACE): void {
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    log.info(nameSpace, `The App is using approximately ${Math.round(used * 100) / 100} MB`)
}

export function onlyNumbers(value: string): string {
    return value.replace(/\D/g, '')
}

export function formatCompanyName(name: string): string {
    return name.trim().toUpperCase()
}

export function formatStock(stock: string): string {
    return stock.replace('.SA', '')
}

export function formatValue(value: string): number {
    return Number(value.replace('R$', '').replace(' ', '').replace(',', '.'))
}

export function formatVariation(value: string): number {
    return Number(value.replace('%', '').replace(' ', '').replace(',', '.'))
}

export function formatVolumeValue(value: string): number {
    return Number(value.replace('mi', '').replace(' ', '').replace(',', '.'))
}

export function formatZerosLeft(value: number, mask: string = '00'): string {
    return numeral(value).format(mask)
}

export function isProduction(): boolean {
    const isProduction = process.env.NODE_ENV === 'production'

    if (isProduction) {
        log.info(this.NAMESPACE, 'isProduction')
    } else {
        log.info(this.NAMESPACE, 'isDevelopment')
    }

    return isProduction
}

export function isWorkingTime(): boolean {
    const currentTime = {
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
    }

    if ((currentTime.hour <= 10) || (currentTime.hour >= 17 && currentTime.minute >= 40)) {
        log.info(this.NAMESPACE, 'Skipping schedule', currentTime)
        return false
    }
    return true
}

export function schedulesEvery25min(): string {
    return '*/25 * * * *'
}

export function schedulesWeekDay(hour: number = 10, increaseHour: number = 0): string {
    return `0 0 ${hour + increaseHour} * * 1-5`
}

export function schedulesDevString(increaseMin: number = 1): string {
    let currentHour = (new Date()).getHours()
    let nextMin = (new Date()).getMinutes() + increaseMin

    if (nextMin === 60) {
        nextMin = 0
        currentHour++
    }

    const value = `0 ${nextMin} ${currentHour} * * *`
    log.debug(this.NAMESPACE, 'Schedules configuration:', value)
    return value
}

export function moneyToInt(value: number): number {
    return Math.floor(value * 100)
}

export function intToMoney(value: number): number {
    return value / 100
}
