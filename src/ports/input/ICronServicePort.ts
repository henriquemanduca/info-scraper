export default interface ICronServicePort {
    newCron(schedule: string, _callback: () => void): any
}
