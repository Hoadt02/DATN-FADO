package com.fado.watch.service.impl;

import com.fado.watch.dto.request.ChangeInfoOrder;
import com.fado.watch.dto.request.FilterOrder;
import com.fado.watch.dto.response.CharBarDTO;
import com.fado.watch.dto.response.OrderCancelDTO;
import com.fado.watch.dto.response.TopProductDTO;
import com.fado.watch.dto.response.TotalOrderDTO;
import com.fado.watch.entity.Order;
import com.fado.watch.entity.OrderDetail;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.repository.OrderDetailRepository;
import com.fado.watch.repository.OrderRepository;
import com.fado.watch.repository.ProductDetailRepository;
import com.fado.watch.service.IOrderDetailService;
import com.fado.watch.service.IOrderService;
import com.fado.watch.service.IProductDetailService;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.text.DecimalFormat;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

    private final IOrderDetailService orderDetailService;

    private final OrderRepository orderRepository;

    private final OrderDetailRepository orderDetailRepository;

    private final IProductDetailService productDetailService;

    private final ProductDetailRepository productDetailRepository;

    private final EntityManager entityManager;

    public OrderServiceImpl(IOrderDetailService orderDetailService, OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, IProductDetailService productDetailService, ProductDetailRepository productDetailRepository, EntityManager entityManager) {
        this.orderDetailService = orderDetailService;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.productDetailService = productDetailService;
        this.productDetailRepository = productDetailRepository;
        this.entityManager = entityManager;
    }

    @Override
    public List<Order> getAll() {
        return this.orderRepository.findAllFaDo();
    }

    @Override
    public List<Order> findAllByCustomerId(Integer id) {
        return this.orderRepository.findAllByCustomerId(id);
    }

    @Override
    public Order findById(Integer id) {
        return this.orderRepository.findOrderByIdFado(id);
    }

    @Override
    public void changeInfoOrder(ChangeInfoOrder dto) {
        this.orderRepository.changeInfoOrder(
                dto.getShipAddress()
                , dto.getFullname()
                , dto.getPhoneNumber()
                , dto.getFeeShipping()
                , dto.getTotalPayment()
                , dto.getId()
        );
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
    public void revertOrder(String description, Integer id) {
        List<OrderDetail> orderDetails = this.orderDetailService.getAllOrderDetailInOrder(id);
        for (OrderDetail o : orderDetails) {
            o.getProductDetail().setQuantity(o.getQuantity() + o.getProductDetail().getQuantity());
            this.productDetailService.update(o.getProductDetail());
        }
        this.orderRepository.revertOrder(description, id);
    }

    @Override
    public List<CharBarDTO> getChartBar() {
        return this.orderRepository.chartBar(Year.now().getValue());
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
    public Integer getTotalOneDay() {
        return this.orderRepository.totalOneDay();
    }


    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @Override
    public List<Order> getOrderByStaff(Integer id) {
        return this.orderRepository.getOrderByStaff(id);
    }

    @Override
    public Order updateMua(Order order) {
        List<OrderDetail> orderDetails = this.orderDetailRepository.findOrderDetailByOrder(order.getId());

        for (OrderDetail orderDetail : orderDetails) {
            ProductDetail productDetail = this.productDetailRepository.findById(orderDetail.getProductDetail().getId()).get();
            productDetail.setQuantity(productDetail.getQuantity() - orderDetail.getQuantity());
            System.out.println("So luong: " + productDetail.getQuantity());
            this.productDetailRepository.save(productDetail);
        }
        return orderRepository.save(order);
    }

    @Override
    public Order updateHuy(Order order) {
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
            run19.setFontSize(12);
            run19.setTextPosition(50);


            XWPFParagraph paragraph22 = document.createParagraph();
            paragraph22.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run22 = paragraph22.createRun();
            run22.setText("Cảm ơn quý khách đã đến với cửa hàng chúng tôi");

            XWPFParagraph paragraph23 = document.createParagraph();
            paragraph23.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run23 = paragraph23.createRun();
            run23.setText("-------------------------------");

            XWPFParagraph paragraph24 = document.createParagraph();
            paragraph24.setAlignment(ParagraphAlignment.CENTER);
            XWPFRun run24 = paragraph24.createRun();
            run24.setText("***Chúc quý khách một ngày tốt lành***");

            document.write(fos);
            fos.close();
            document.close();

            System.out.println("Xuat hoa don thanh cong !!!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Order> filterOrder(FilterOrder filterOrder) {
        return this.orderRepository.filterOrder(filterOrder.getStartDate(),
                filterOrder.getEndDate(),
                filterOrder.getCustomerId());
    }

    @Override
    public List<TopProductDTO> getListTop() {
        Query query = this.entityManager.createNativeQuery("select p.id, p.name, p.quantity,sum(od.quantity) as soluongban, sum(o.total_payment) as tongtien\n" +
                "from orders o join order_details od on od.order_id = o.id join product_details p on od.product_detail_id = p.id \n" +
                "where o.status = 3\n" +
                "group by p.name, p.id\n" +
                "order by sum(od.quantity) desc limit 8");
        List<Object[]> results = query.getResultList();
        if (results.size() > 0){
            List<TopProductDTO> dtos = new ArrayList<>();
            for (Object[] o : results) {
                TopProductDTO dto = new TopProductDTO();
                dto.setId(Integer.valueOf(o[0].toString()));
                dto.setName(String.valueOf(o[1]));
                dto.setQuantity(Integer.valueOf(o[2].toString()));
                dto.setSoLuongBan(Integer.valueOf(o[3].toString()));
                dto.setTongTien(Double.valueOf(o[4].toString()));
                dtos.add(dto);
            }
            return dtos;
        }
        return null;
    }
}
