import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";

@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) {}

    async create(dto: CreateTrackDto): Promise<Track> {
        const track = await this.trackModel.create({...dto, listened: 0})
        return track

    }

    async getAll(): Promise<Track[]>{
        const tracks = await this.trackModel.find({})
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track>{
        const tracks = await (await this.trackModel.findById(id))?.populate('comments')
        return tracks
    }

    async delete(id: ObjectId): Promise<Track> {
        const deletedTrack = await this.trackModel.findByIdAndDelete(id)
        return deletedTrack
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

}