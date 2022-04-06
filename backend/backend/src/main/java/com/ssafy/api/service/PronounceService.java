package com.ssafy.api.service;

import com.google.gson.Gson;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class PronounceService {
    public void pronounce(MultipartFile multipartFile2) {
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation"; // 영어
        //String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor";   //한국어
        String accessKey = "151eac6a-5b68-4ad5-a784-36d773e22df9";    // 발급받은 API Key
        String languageCode = "english";     // 언어 코드
//        String script = "PRONUNCIATION_SCRIPT";    // 평가 대본
        String audioFilePath = "https://ssafy-s3-bucket.s3.ap-northeast-2.amazonaws.com/86d03c29-7a37-466e-abaa-7faa23e03d80.m4a";  // 녹음된 음성 파일 경로
        String audioContents = null;

        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        try {
            byte[] audioBytes = multipartFile2.getBytes();
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        argument.put("language_code", languageCode);
//        argument.put("script", script);
        argument.put("audio", audioContents);

        request.put("access_key", accessKey);
        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;
        try {
            url = new URL(openApiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(request).getBytes("UTF-8"));
            wr.flush();
            wr.close();

            responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            responBody = new String(buffer);

//            System.out.println("[responseCode] " + responseCode);
//            System.out.println("[responBody]");
//            System.out.println(responBody);

            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(responBody);
            String return_object = jsonObject.get("return_object").toString();
            JSONObject jsonObject1 = (JSONObject) parser.parse(return_object);


            System.out.println(jsonObject1.get("score"));

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
