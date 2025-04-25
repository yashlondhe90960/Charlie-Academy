package com.charlie.lms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.charlie.lms.Exceptions.VideoNotFoundException;
import com.charlie.lms.model.Video;
import com.charlie.lms.repository.VideoRepository;

import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    /**
     * Fetch all videos from the repository.
     */
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    /**
     * Fetch videos by course ID from the repository.
     * Throws VideoNotFoundException if no videos are found for the given course ID.
     */
    public List<Video> getVideosByCourseId(int courseID) {
        if (videoRepository.findByCourseId(courseID).isEmpty()) {
            throw new VideoNotFoundException("No videos found for course with ID: " + courseID);
        }
        return videoRepository.findByCourseId(courseID);
    }

    /**
     * Add a new video to the repository.
     * Throws VideoNotFoundException if a video with the same title already exists.
     */
    public Video addVideo(Video video) {
        if (videoRepository.findByTitle(video.getTitle()).isPresent()) {
            throw new VideoNotFoundException("Video already exists with title: " + video.getTitle());
        }
        return videoRepository.save(video);
    }

    /**
     * Delete a video by ID from the repository.
     * Throws VideoNotFoundException if the video is not found.
     */
    public void deleteVideo(int videoId) {
        if (videoRepository.findById(videoId).isEmpty()) {
            throw new VideoNotFoundException("Video not found with ID: " + videoId);
        }
        videoRepository.deleteById(videoId);
    }

    /**
     * Mark a video as completed by ID.
     * Returns null if the video is not found.
     * FRONTEND
     */
  

    public Video updateVideo(int videoId, Video video) {
        Video existingVideo = videoRepository.findById(videoId)
                .orElseThrow(() -> new VideoNotFoundException("Video not found with ID: " + videoId));
        
        existingVideo.setVideoId(videoId);
        existingVideo.setTitle(video.getTitle());
        existingVideo.setVideoUrl(video.getVideoUrl());
        // Maintain the original courseId
        existingVideo.setCourseId(existingVideo.getCourseId());
        
        return videoRepository.save(existingVideo);
    }
    
    public Video getVideoById(int videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new VideoNotFoundException("Video not found with ID: " + videoId));
    }
   
}