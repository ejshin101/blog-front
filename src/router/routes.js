import {HomeRouters} from '@router/home.js'
import {AuthRouters} from '@router/auth'
import {MemberRouters} from '@router/member'
import {BoardRouters} from '@router/board'
import {GuestRouters} from '@router/guest'
import {ResumeRouters} from '@router/resume.js'

const routes = [
    ...HomeRouters,
    ...AuthRouters,
    ...MemberRouters,
    ...BoardRouters,
    ...GuestRouters,
    ...ResumeRouters,
]

export default routes