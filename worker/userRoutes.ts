import { Hono } from "hono";
import { Env } from './core-utils';
import type { Unit, ApiResponse } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/units', async (c) => {
        try {
            const durableObjectStub = c.env.GlobalDurableObject.get(c.env.GlobalDurableObject.idFromName("global"));
            const data = await durableObjectStub.getUnits();
            return c.json({ success: true, data } satisfies ApiResponse<Unit[]>);
        } catch (error) {
            console.error("Error fetching units:", error);
            return c.json({ success: false, error: "Failed to fetch unit data" }, 500);
        }
    });
}