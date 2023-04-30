package com.ssafy.forestauth.service;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.msg.SelectCheeringMsgResponseDto;
import com.ssafy.forestauth.entity.CheeringMsg;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.repository.CheeringMsgRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CheeringMsgService {

    private final ResponseUtil responseUtil;
    private final CheeringMsgRepository cheeringMsgRepository;

    public ResponseSuccessDto<SelectCheeringMsgResponseDto> selectMsg() {
        List<CheeringMsg> msgList = cheeringMsgRepository.findAll();
        SelectCheeringMsgResponseDto cheeringMsgResponseDto;

        if(msgList.size() == 0) {
            cheeringMsgResponseDto = SelectCheeringMsgResponseDto.builder()
                    .content("No Content")
                    .build();
        } else{
            int idx = (int) Math.round(Math.random() * (msgList.size() - 1));
            CheeringMsg cheeringMsg = msgList.get(idx);
             cheeringMsgResponseDto= SelectCheeringMsgResponseDto.builder()
                    .content(cheeringMsg.getContent())
                    .build();
        }

        ResponseSuccessDto<SelectCheeringMsgResponseDto> res = responseUtil.successResponse(cheeringMsgResponseDto, SuccessCode.AUTH_READ_CHEERING_MSG);
        return res;
    }
}
