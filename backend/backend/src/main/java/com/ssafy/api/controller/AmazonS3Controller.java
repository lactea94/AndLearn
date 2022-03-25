package com.ssafy.api.controller;

import com.ssafy.api.request.LearnPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.AwsS3Service;
import com.ssafy.db.entity.Learn;
import com.ssafy.db.entity.Record;
import com.ssafy.db.entity.Word;
import com.ssafy.db.repository.LearnRepository;
import com.ssafy.db.repository.RecordRepository;
import com.ssafy.db.repository.WordRepository;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/s3")
public class AmazonS3Controller {

    private final AwsS3Service awsS3Service;
    private final LearnRepository learnRepository;
    private final WordRepository wordRepository;
    private final RecordRepository recordRepository;

    @PostMapping("/learn/{key}")
    public ResponseEntity learnSave(@PathVariable Long key,
                                      @RequestPart(value="file", required = false) List<MultipartFile> multipartFile,
                                      @RequestPart(value="learnPostReq") LearnPostReq learnPostReq) {

        // key로 해당 컬럼 찾아서 rank 저장

        Optional<Learn> learnTmp = learnRepository.findById(key);
        float rank = learnPostReq.getScore();

        if (learnTmp.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Learn learn = learnTmp.get();
        learn.setScore(rank);
        learnRepository.save(learn);
        // AI-words 저장
        List<String> words = learnPostReq.getWords();
        words.forEach(aiWord -> {
            Word word = new Word();
            word.setContent(aiWord);
            word.setLearn(learn);
            wordRepository.save(word);
                });
        // 음성 파일 저장
        List<String> fileNameList = awsS3Service.uploadFiles(multipartFile);
        fileNameList.forEach(fileName -> {
            String url = awsS3Service.getThumbnailPath(fileName);
            Record record = new Record();
            record.setRecordUrl(url);
            record.setLearn(learn);
            recordRepository.save(record);
        });

        return new ResponseEntity(HttpStatus.OK);

    }


    @ApiOperation(value = "Amazon S3에 파일 업로드", notes = "Amazon S3에 파일 업로드 ")
    @PostMapping("/file")
    public ResponseEntity<List<String>> uploadFile(@ApiParam(value="파일들(여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile) {
//        return ApiResponse.success(awsS3Service.uploadFile(multipartFile));
        return ResponseEntity.status(200).body(awsS3Service.uploadFiles(multipartFile));
    }


    @ApiOperation(value = "Amazon S3에 업로드 된 파일을 삭제", notes = "Amazon S3에 업로드된 파일 삭제")
    @DeleteMapping("/file")
    public ResponseEntity<Void> deleteFile(@ApiParam(value="파일 하나 삭제", required = true) @RequestParam String fileName) {
        awsS3Service.deleteFile(fileName);
        return new ResponseEntity(HttpStatus.OK);
    }


}