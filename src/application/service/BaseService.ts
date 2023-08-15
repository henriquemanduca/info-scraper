import logs from '@shared/log/index.js'


export default class BaseService {
    protected log = logs
    protected NAMESPACE: string
}