import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ClassScheduleRoutes } from "../modules/classSchedule/classSchedule.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router=Router();
const moduleRoutes=[
    {
        path:'/users',
        route:UserRoutes,
    },
    {
        path:'/schedules',
        route:ClassScheduleRoutes,
    },
    {
        path:'/bookings',
        route:BookingRoutes,
    }
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;