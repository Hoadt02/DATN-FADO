package com.fado.watch.service.impl;

import com.fado.watch.dto.response.CharBarDTO;
import com.fado.watch.dto.response.OrderCancelDTO;
import com.fado.watch.dto.response.TotalOrderDTO;
import com.fado.watch.entity.Order;
import com.fado.watch.entity.OrderDetail;
import com.fado.watch.repository.OrderDetailRepository;
import com.fado.watch.repository.OrderRepository;
import com.fado.watch.service.IOrderDetailService;
import com.fado.watch.service.IOrderService;
import com.fado.watch.service.IProductDetailService;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.text.DecimalFormat;
import java.time.Year;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

    private final IOrderDetailService orderDetailService;

    private final OrderRepository orderRepository;

    private final OrderDetailRepository orderDetailRepository;

    private final IProductDetailService productDetailService;

    public OrderServiceImpl(IOrderDetailService orderDetailService, OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, IProductDetailService productDetailService) {
        this.orderDetailService = orderDetailService;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.productDetailService = productDetailService;
    }

    @Override
    public List<Order> getAll() {
        return this.orderRepository.findAll();
    }

    @Override
    public List<Order> findAllByCustomerId(Integer id) {
        return this.orderRepository.findAllByCustomerId(id);
    }

    @Override
    public Order findById(Integer id) {
        return this.orderRepository.findOrderById(id);
    }

    @Override
    public Order save(Order order) {
        return this.orderRepository.save(order);
    }

//    @Override
//    public void delete(Integer id) {
//        orderRepository.deleteById(id);
//    }

    public void updateStatus(Integer status, Integer id) {
        if (4 == status) {
            List<OrderDetail> orderDetails = this.orderDetailService.getAllOrderDetailInOrder(id);
            for (OrderDetail o : orderDetails) {
                o.getProductDetail().setQuantity(o.getQuantity() + o.getProductDetail().getQuantity());
                this.productDetailService.update(o.getProductDetail());
            }
        }
        this.orderRepository.updateStatus(status, id);
    }

    @Override
    public List<CharBarDTO> getChartBar() {
        return this.orderRepository.chartBar();
    }

    @Override
    public Integer getTotalRevenue() {
        return this.orderRepository.totalRevenue(Year.now().getValue());
    }

    @Override
    public List<TotalOrderDTO> getTotalOrder() {
        return this.orderRepository.totalOrder();
    }

    @Override
    public List<OrderCancelDTO> getOrderCancel() {
        return this.orderRepository.orderCancel();
    }

    @Override
    public Integer getTotalOneDay() { return this.orderRepository.totalOneDay(); }



    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @Override
    public List<Order> getOrderByStaff(Integer id) {
        return this.orderRepository.getOrderByStaff(id);
    }

    @Override
    public Order update(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrderById(Integer id) {
        return orderRepository.getOrderById(id);
    }

    @Override
    public List<Order> getOrderHistory(Integer id, Integer status) {
        return orderRepository.getOrderHistory(id, status);
    }

    @Override
    public void exportOrder(Integer id) {
        DecimalFormat formatter = new DecimalFormat("###,###,###");
        Order order = this.orderRepository.findOrderById(id);
        List<OrderDetail> orderDetailList = this.orderDetailRepository.findOrderDetailByOrder(order.getId());
        String FILE_NAME = "src\\main\\resources\\static\\assets\\export\\" + order.getId() + ".docx";
        try {
            FileOutputStream fos = new FileOutputStream(new File(FILE_NAME));
            XWPFDocument document = new XWPFDocument();

            XWPFParagraph paragraph = document.createParagraph();
            XWPFRun run = paragraph.createRun();
            paragraph.setAlignment(ParagraphAlignment.CENTER);
            run.setText("FADO SHOP");
            run.setFontSize(20);
            run.setBold(true);

            XWPFParagraph paragraph2 = document.createParagraph();
            XWPFRun run2 = paragraph2.createRun();
            paragraph2.setAlignment(ParagraphAlignment.CENTER);
            run2.setText("ĐC: 100 Mỹ Đình, Nam Từ Liêm, Hà Nội");

            XWPFParagraph paragraph3 = document.createParagraph();
            XWPFRun run3 = paragraph3.createRun();
            paragraph3.setAlignment(ParagraphAlignment.CENTER);
            run3.setText("ĐT: 0975.086.003 - 0339.874.550");
            run3.setTextPosition(50);

            XWPFParagraph paragraph4 = document.createParagraph();
            XWPFRun run4 = paragraph4.createRun();
            paragraph4.setAlignment(ParagraphAlignment.CENTER);
            run4.setText("HÓA ĐƠN BÁN HÀNG");
            run4.setFontSize(30);
            run4.setBold(true);

            XWPFParagraph paragraph5 = document.createParagraph();
            XWPFRun run5 = paragraph5.createRun();
            paragraph5.setAlignment(ParagraphAlignment.RIGHT);
            run5.setText("Hóa đơn số: " + order.getId());

            XWPFParagraph paragraph6 = document.createParagraph();
            XWPFRun run6 = paragraph6.createRun();
            paragraph6.setAlignment(ParagraphAlignment.RIGHT);
            run6.setText("Ngày tạo: " + order.getCreateDate());
            run6.setTextPosition(50);

            XWPFParagraph paragraph7 = document.createParagraph();
            XWPFRun run7 = paragraph7.createRun();
            paragraph7.setAlignment(ParagraphAlignment.LEFT);
            run7.setText("Thu ngân: " + order.getStaff().getFirstname() + " " + order.getStaff().getLastname());

            XWPFParagraph paragraph8 = document.createParagraph();
            XWPFRun run8 = paragraph8.createRun();
            paragraph8.setAlignment(ParagraphAlignment.LEFT);
            run8.setText("Khách hàng: " + order.getCustomer().getFirstname() + " " + order.getCustomer().getLastname());

            XWPFParagraph paragraph9 = document.createParagraph();
            XWPFRun run9 = paragraph9.createRun();
            paragraph9.setAlignment(ParagraphAlignment.LEFT);
            run9.setText("SĐT: " + order.getCustomer().getPhoneNumber());

            XWPFTable table = document.createTable(orderDetailList.size() + 2, 5);
            table.setWidth("100%");

            XWPFTableRow rowHeader = table.getRow(0);
            XWPFParagraph paragraph10 = rowHeader.getCell(0).addParagraph();
            paragraph10.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run10 = paragraph10.createRun();
            run10.setText("STT");
            run10.setBold(true);
            run10.setTextPosition(20);

            XWPFTableRow rowHeader1 = table.getRow(0);
            XWPFParagraph paragraph11 = rowHeader1.getCell(1).addParagraph();
            paragraph11.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run11 = paragraph11.createRun();
            run11.setText("Tên sản phẩm");
            run11.setBold(true);
            run11.setTextPosition(20);

            XWPFTableRow rowHeader2 = table.getRow(0);
            XWPFParagraph paragraph12 = rowHeader2.getCell(2).addParagraph();
            paragraph12.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run12 = paragraph12.createRun();
            run12.setText("Giá");
            run12.setBold(true);
            run12.setTextPosition(20);

            XWPFTableRow rowHeader3 = table.getRow(0);
            XWPFParagraph paragraph13 = rowHeader3.getCell(3).addParagraph();
            paragraph13.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run13 = paragraph13.createRun();
            run13.setText("Số lượng");
            run13.setBold(true);
            run13.setTextPosition(20);

            XWPFTableRow rowHeader4 = table.getRow(0);
            XWPFParagraph paragraph14 = rowHeader4.getCell(4).addParagraph();
            paragraph14.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run14 = paragraph14.createRun();
            run14.setText("Thành tiền");
            run14.setBold(true);
            run14.setTextPosition(20);

            for (int i = 0; i < orderDetailList.size(); i++) {
                table.getRow(i + 1).getCell(0).setText(String.valueOf(i + 1));
                table.getRow(i + 1).getCell(1).setText(orderDetailList.get(i).getProductDetail().getName());
                table.getRow(i + 1).getCell(2).setText(formatter.format(orderDetailList.get(i).getProductDetail().getPrice()) + " VNĐ");
                table.getRow(i + 1).getCell(3).setText(String.valueOf(orderDetailList.get(i).getQuantity()));
                table.getRow(i + 1).getCell(4).setText(formatter.format(orderDetailList.get(i).getProductDetail().getPrice() * orderDetailList.get(i).getQuantity()) + " VNĐ");
            }

            int tongSoLuong = 0;
            for (int i = 0; i < orderDetailList.size(); i++) {
                tongSoLuong += Integer.parseInt(String.valueOf(orderDetailList.get(i).getProductDetail().getQuantity()));
            }

            XWPFParagraph paragraph15 = document.createParagraph();
            paragraph15.setAlignment(ParagraphAlignment.LEFT);

            XWPFParagraph paragraph16 = document.createParagraph();
            XWPFRun run16 = paragraph16.createRun();
            paragraph16.setAlignment(ParagraphAlignment.LEFT);
            run16.setText("Tổng tiền:  " + formatter.format(order.getTotal()) + " VNĐ");
            run16.setBold(true);
            run16.setFontSize(10);

            XWPFParagraph paragraph17 = document.createParagraph();
            XWPFRun run17 = paragraph17.createRun();
            paragraph17.setAlignment(ParagraphAlignment.LEFT);
            run17.setText("Giảm giá:  " + formatter.format(order.getDiscount()) + " VNĐ");
            run17.setBold(true);
            run17.setFontSize(10);

            XWPFParagraph paragraph18 = document.createParagraph();
            paragraph18.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run18 = paragraph18.createRun();
            run18.setText("------------------------------------------------------------------------------------------------------------------------------------------");

            XWPFParagraph paragraph19 = document.createParagraph();
            XWPFRun run19 = paragraph19.createRun();
            paragraph19.setAlignment(ParagraphAlignment.LEFT);
            run19.setText("Tổng tiền thanh toán:  " + formatter.format(order.getTotalPayment()) + " VNĐ");
            run19.setBold(true);
            run19.setFontSize(14);
            run19.setTextPosition(100);

            XWPFParagraph paragraph20 = document.createParagraph();
            paragraph20.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run20 = paragraph20.createRun();
            run20.setText("Quý khách vui lòng kiểm tra kỹ hàng");

            XWPFParagraph paragraph21 = document.createParagraph();
            paragraph21.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run21 = paragraph21.createRun();
            run21.setText("-------------------------------");

            XWPFParagraph paragraph22 = document.createParagraph();
            paragraph22.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run22 = paragraph22.createRun();
            run22.setText("Cảm ơn quý khách đã mua hàng và hẹn gặp lại!");

            document.write(fos);
            fos.close();
            document.close();

            System.out.println("Xuat hoa don thanh cong !!!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
