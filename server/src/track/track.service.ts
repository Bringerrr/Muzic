import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { FileService, FileType } from "src/file/file.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";

@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) {}



    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioFile = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.trackModel.create({...dto, listened: 0 , audio: audioFile, picture: picturePath })
        return track

    }

    async getAll(count=10, offset=0): Promise<Track[]>{
        const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count))
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track>{
        const tracks = await this.trackModel.findById(id).populate('comments')
        return tracks
    }

    async delete(id: ObjectId): Promise<Track> {
        const deletedTrack = await this.trackModel.findByIdAndDelete(id)
        return deletedTrack
    }

    async search(query: string): Promise<Track[]> {
        console.log('search ' , query)
        const tracks = await this.trackModel.find({
            name:{
                $regex: new RegExp(query)
            }
        })
        return tracks
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

}