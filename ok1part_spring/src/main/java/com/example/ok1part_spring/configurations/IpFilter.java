package com.example.ok1part_spring.configurations;

import com.example.ok1part_spring.utils.HttpUtils;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;


public class IpFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException{
        //HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String ip = HttpUtils.getRequestIP(httpRequest);

        /*
        if(ip == null){
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        */

        httpRequest.setAttribute("request_ip", ip);
        chain.doFilter(request, response);
    }
}
