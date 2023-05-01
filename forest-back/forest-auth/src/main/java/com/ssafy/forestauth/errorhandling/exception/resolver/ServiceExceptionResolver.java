package com.ssafy.forestauth.errorhandling.exception.resolver;

import com.ssafy.forestauth.dto.common.response.ResponseErrorDto;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidPasswordException;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidTokenException;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidValueException;
import com.ssafy.forestauth.mattermost.NotificationManager;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.util.Enumeration;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ServiceExceptionResolver {

    private final ResponseUtil responseUtil;

    @Autowired
    private NotificationManager notificationManager;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = EntityIsNullException.class)
    public ResponseErrorDto<?> handle(EntityIsNullException e, HttpServletRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));
        return responseUtil.buildErrorResponse(errorCode, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = InvalidPasswordException.class)
    public ResponseErrorDto<?> handle(InvalidPasswordException e, HttpServletRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));
        return responseUtil.buildErrorResponse(errorCode, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = InvalidValueException.class)
    public ResponseErrorDto<?> handle(InvalidValueException e, HttpServletRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));
        return responseUtil.buildErrorResponse(errorCode, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = InvalidTokenException.class)
    public ResponseErrorDto<?> handle(InvalidTokenException e, HttpServletRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        System.out.println("error message = " + e.getErrorCode().getMessage());
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));
        return responseUtil.buildErrorResponse(errorCode, request.getRequestURI());
    }



    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append('\n');
        }
        return params.toString();
    }
}
