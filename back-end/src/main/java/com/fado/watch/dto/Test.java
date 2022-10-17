package com.fado.watch.dto;

import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class Test {
    public static void main(String[] args) {
        Boolean[] gender = new Boolean[]{true, false};
        System.out.println(Arrays.toString(gender));
    }
}
