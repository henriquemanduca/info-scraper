import * as nodeSchedule from 'node-schedule'

import ICronServicePort from '@ports/input/ICronServicePort.js'
import BaseService from './BaseService.js'


export default class CronService extends BaseService implements ICronServicePort {

    constructor() {
        super()
        this.NAMESPACE = 'CronService'
    }

    public newCron(schedule: string, _callback: () => void): any {
        // run at start
        _callback()
        // set the timer
        return nodeSchedule.scheduleJob(schedule, _callback)
    }
}
