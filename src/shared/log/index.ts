import { format } from 'date-fns-tz'


const getTimeStamp = (): string => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss', { timeZone: 'America/Sao_Paulo' })
}

const info = (namespace: string, message: string, object?: any) => {
    const msg = `[${getTimeStamp()}] [INFO ] [${namespace}] ${message}`
    if (object) {
        console.debug(msg, object)
    } else {
        console.debug(msg)
    }
}

const warn = (namespace: string, message: string, object?: any) => {
    const msg = `[${getTimeStamp()}] [WARN ] [${namespace}] ${message}`
    if (object) {
        console.debug(msg, object)
    } else {
        console.debug(msg)
    }
}

const error = (namespace: string, message: string, object?: any) => {
    const msg = `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`
    if (object) {
        console.debug(msg, object)
    } else {
        console.debug(msg)
    }
}

const debug = (namespace: string, message: string, object?: any) => {
    const msg = `[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`
    if (object) {
        console.debug(msg, object)
    } else {
        console.debug(msg)
    }
}

export default {
    info,
    warn,
    error,
    debug
}
