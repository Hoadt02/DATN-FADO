package com.fado.watch;

import java.time.LocalDate;
import java.util.Date;
import java.util.Random;

public class test {
    public static void main(String[] args) {
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            Long number = Math.abs(random.nextLong());
            System.out.println(number.toString().substring(0,15));
        }
        System.out.println(LocalDate.now());
    }
}