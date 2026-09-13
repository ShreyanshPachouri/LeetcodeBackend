import { Response, Request } from "express";
import { SubmissionService } from "../services/submission.service";
import logger from "../config/logger.config";

export class SubmissionController{
    private submissionService: SubmissionService

    constructor(submissionService: SubmissionService){
        this.submissionService = submissionService
    }

    createSubmission = async(req: Request, res: Response) => {
        logger.info("Creating new submission", { body: req.body })

        const submission = await this.submissionService.createSubmission(req.body)

        logger.info("Submission created successfully", { submissionId: submission._id })

        res.status(201).json({
            success: true,
            message: "Submission created successfully",
            data: submission
        })
    }

    getSubmissionById = async(req: Request, res: Response) => {
        const { id } = req.params
        logger.info("Fetching submission by ID", { submissionId: id })

        const submission = await this.submissionService.getSubmissionById(id)
        logger.info("Submission fetched successfully", { submissionId: id })

        res.status(200).json({
            success: true,
            message: "Submission fetched successfully",
            data: submission
        })
    }

    getSubmissionsByProblemId = async(req: Request, res: Response) => {
        const { problemId } = req.params
        logger.info("Fetching submissions by problemId", { problemId: problemId })

        const submissions = await this.submissionService.getSubmissionByProblemId(problemId)
        logger.info("Submissions fetched successfully", { problemId: problemId, count: submissions.length })

        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            data: submissions
        })
    }

    deleteSubmissionById = async(req: Request, res: Response) => {
        const { id } = req.params
        logger.info("Deleting submissions by id", { submissionId: id })

        await this.submissionService.deleteSubmissionById(id)

        logger.info("Deleted submissions by id", { submissionId: id })

        res.status(200).json({
            success: true,
            message: "Submissions deleted successfully",
        })
    }

    updateSubmissionStatus = async(req: Request, res: Response) => {
        const { id } = req.params
        const { status } = req.body

        logger.info("Updating submission status", {
            submissionId: id,
            status
        })

        const submission = await this.submissionService.updateSubmissionStatus(id, status)

        logger.info("Submission status updated", {
            submissionId: id,
            status
        })

        res.status(200).json({
            success: true,
            message: "Submissions status updated successfully",
            data: submission
        })
    }
}