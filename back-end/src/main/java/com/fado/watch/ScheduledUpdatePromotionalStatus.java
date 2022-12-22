package com.fado.watch;

import com.fado.watch.entity.Promotional;
import com.fado.watch.repository.PromotionalRepository;
import com.fado.watch.service.IPromotionalService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
@EnableScheduling
@Slf4j
@AllArgsConstructor
public class ScheduledUpdatePromotionalStatus {

    private final PromotionalRepository promotionalRepository;
    private final IPromotionalService iPromotionalService;

    public static void main(String[] args) {
        SpringApplication.run(ScheduledUpdatePromotionalStatus.class, args);
    }

    @Scheduled(cron = "0 0 0 * * ?") // sẽ cập nhật lại trạng thái vào 00:00 hàng ngày
    public void scheduledUpdateOrderStatus() {
        this.updateStatus();
    }

    private void updateStatus() {
        LocalDate now = LocalDate.now();
        List<Promotional> promotionals = this.promotionalRepository.findAllByStatusTrue();
        if (promotionals.size() > 0) {
            for (Promotional x : promotionals
            ) {
                if (x.getStatus() == 1 && x.getEndDate().isBefore(now)) {
                    x.setStatus(0);
                    log.info("Đã thay đổi trạng thái của khuyến mại {} về ngưng hoạt động", x.getName());
                } else if (x.getStatus() == 2 && (x.getStartDate().isBefore(now) || x.getStartDate().isEqual(now))) {
                    x.setStatus(1);
                    log.info("Đã thay đổi trạng thái của khuyến mại {} sang đang hoạt động", x.getName());
                }
                this.iPromotionalService.update(x);
            }
        }
    }
}