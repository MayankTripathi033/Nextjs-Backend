import dbConnect from "@/lib/db.connect";
import PipelineModel from "@/model/pipeline.model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /pipeline/{createdBy}:
 *   get:
 *     summary: Get paginated pipeline data by createdBy
 *     tags:
 *       - Pipeline
 *     parameters:
 *       - in: path
 *         name: createdBy
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d21b8667d0d8992e610c85
 *         description: The ID of the user who created the pipeline
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of records per page (default is 10)
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
 *                 message:
 *                   type: string
 *                   example: "Paginated pipeline data"
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
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalItems:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
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
 *                   example: "Error retrieving pipeline data"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { createdBy: string } }
) {
  await dbConnect();
  
  try {
    const { createdBy } = params;

    // Parse pagination parameters from request body
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    // Convert page and limit to numbers and ensure they are positive integers
    const pageNumber = page > 0 ? page : 1;
    const pageSize = limit > 0 ? limit : 10;

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * pageSize;

    // Fetch paginated data
    const data = await PipelineModel.find({ createdBy: createdBy })
                                   .skip(skip)
                                   .limit(pageSize);

    // Get the total count for pagination metadata
    const total = await PipelineModel.countDocuments({ createdBy: createdBy });

    return NextResponse.json(
      {
        success: true,
        message: "Paginated pipeline data",
        payload: data,
        pagination: {
          currentPage: pageNumber,
          pageSize: pageSize,
          totalItems: total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in :: Pipeline", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving pipeline data",
        error: error, // Include only the error message
      },
      {
        status: 500,
      }
    );
  }
}
