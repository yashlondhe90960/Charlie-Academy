package com.charlie.lms.Exceptions;

public class SubmissionAlreadyExistsException  extends RuntimeException {
    public SubmissionAlreadyExistsException(String message) {
        super(message);
    }

}
