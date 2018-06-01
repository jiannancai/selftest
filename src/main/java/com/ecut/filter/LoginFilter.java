package com.ecut.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ecut.pojo.Loginer;

public class LoginFilter implements Filter {
    
    private String sessionKey;
    private String rediretUrl;
    private String uncheckedUrls;

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {

        HttpServletRequest httpServletRequest=(HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse=(HttpServletResponse) servletResponse;
        
        //1、得到用户请求路径
        String servletPath=httpServletRequest.getServletPath();
        //2、放行不需要过滤的页面，如登录界面之类的
        List<String> urls=Arrays.asList(uncheckedUrls.split(","));
        if(urls.contains(servletPath)){
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        //3、从session中获取用户并判断用户是否登录过，如果没有登录过则重定向到登录界面
        Loginer loginer= (Loginer)httpServletRequest.getSession().getAttribute(sessionKey);
        
        if(loginer==null){
            httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+rediretUrl);
            return;
        }
        if(loginer.getIdentity() == 0){
        	if(!servletPath.contains("studentInfoController")) {
        		httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+rediretUrl);
        		return;
        	}
        }
        //4、否则放行
        filterChain.doFilter(httpServletRequest, httpServletResponse);
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
        ServletContext servletContext=filterConfig.getServletContext();
        sessionKey=servletContext.getInitParameter("userSessonKey");
        rediretUrl=servletContext.getInitParameter("rediretUrl");
        uncheckedUrls=servletContext.getInitParameter("uncheckedUrls");
	}

}
