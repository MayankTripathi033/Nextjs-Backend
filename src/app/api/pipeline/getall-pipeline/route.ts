import dbConnect from "@/lib/db.connect";
import PipelineModel from "@/model/pipeline.model";
import { Pipeline } from "@/model/pipeline.model";

/**
 * @swagger
 * /pipeline/getall-pipeline:
 *   get:
 *     summary: Get all pipeline data with pagination
 *     tags:
 *       - Pipeline
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated pipeline data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b8667d0d8992e610c85
 *                       name:
 *                         type: string
 *                         example: "Pipeline 1"
 *                       description:
 *                         type: string
 *                         example: "This is a test pipeline"
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error fetching pipeline data
 */

export async function GET(request: Request) {
    await dbConnect();

    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const pipelineData = await PipelineModel.find().lean().skip(skip).limit(limit);
        const totalPipelines = await PipelineModel.countDocuments();

        return new Response(
            JSON.stringify({
                success: true,
                payload: pipelineData,
                totalPages: Math.ceil(totalPipelines / limit),
                currentPage: page,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error fetching pipeline data", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error fetching pipeline data",
                error: error,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
