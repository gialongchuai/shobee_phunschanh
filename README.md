Ron tình:
$ yarn create vite
name shop
cd shop
change port 3000
yarn add -D tailwindcss@3.1.8 postcss@8.4.18 autoprefixer@10.4.12

yarn tailwindcss init -p

change info trong file tailwind.config.cjs

yarn add react-hook-form

yarn add @tanstack/react-query@^5.90.12 @tanstack/react-query-devtools@^5.91.1 yup@^0.32.11 lodash@^4.17.21 axios@^1.1.3

nói chung là chỉnh nhiều lắm có gì vào package json xem lại nhé

thăng tailwindcss thì css cho nó dễ nhưng trong mấy cái tsx
muốn nhận nó đôi khi bị lỗi không nhận thêm cái @tailwindcss line clapm gì đó :vv

--- Frontend

Thằng yup nó validate mấy cía form bên rule
qua bên Page tsx thì chỉ cần pick mấy cái nó validate mà thôi

Thằng composnent đa số chứa mấy cía dùng chug ví dụ Ipunt nhận cía prop bên tsx truyền qua
nó hứng rồi return ra jsx tương thích


---

Xóa cái toString tránh debug gọi lồng qua toString giữa các entity mãi không debug được

---

## ⌨️ Phím tắt IntelliJ

| Phím tắt           | Chức năng                |
| ------------------ | ------------------------ |
| `Ctrl + Shift + F` | Tìm kiếm nhanh           |
| `Alt + J`          | Chọn nhiều từ giống nhau |
| `Ctrl + Alt + L`   | Format code              |
| `Ctrl + Alt + O`   | Loại bỏ code không dùng  |

Cho vs code:
alt + shift + f : format code
ctrl + d: chọn nhiều từ giống nhau
ctrl + r: tìm kiếm project code . recently
shift + alt + o: Loại bỏ code không dùng
alt + mũi tên L : quay lại page vừa ctrl + click

---

# 🚀 Java Spring Boot Project

## 📋 Mục lục

- [Cài đặt & Khởi chạy](#-cài-đặt--khởi-chạy)
- [Phím tắt IntelliJ](#-phím-tắt-intellij)
- [LazyInitializationException](#-lazyinitializationexception)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [P6Spy - SQL Logger](#-p6spy---sql-logger)
- [Swagger API Documentation](#-swagger-api-documentation)
- [API Endpoints](#-api-endpoints)
- [Mô hình phân quyền RBAC](#-mô-hình-phân-quyền-rbac)
- [Spring Security + JWT Flow](#-spring-security--jwt-flow)
- [Internationalization](#-internationalization)
- [Architecture Diagram](#-architecture-diagram)

---

## 🛠 Cài đặt & Khởi chạy

### 1. Chạy Docker Compose

```bash
docker compose up -d
```

### 2. Kết nối PostgreSQL

- Login web với **localhost** sử dụng thông tin trong file `docker-compose.yml`

### 3. Tạo Database

- Tạo mới database trên PostgreSQL với file `postgresql.sql`
- Dán nội dung vào và chạy để tạo bảng

---


## ⚠️ LazyInitializationException

### Vấn đề gặp phải

Lỗi xảy ra khi `User` set `lazy` tới `UserHasRole`:

**Tại tầng Service (Login/Authenticate):**

- Khi gọi tới `loadUser` của `UserDetail`, sau đó gọi tới `authen.getAuthority` có `roles` trong đó → **KHÔNG bị lazy**
- Nguyên nhân: Vẫn còn kết nối transaction của Spring

**Tại tầng PreFilter:**

- Khi gọi tới `loadUser` qua `username`, sau đó gọi tới `loadUserDetail` → **BỊ lỗi `LazyInitializationException`** khi gọi tới method `getAuthor`
- Nguyên nhân: Đã mất kết nối của Spring

### ✅ Giải pháp

Tách `UserDetails` ra riêng và sẽ luôn load được `Role`

### 📝 Lưu ý về SecurityContextHolder

| Trường hợp                     | Có cần setContext? | Lý do                                                                   |
| ------------------------------ | ------------------ | ----------------------------------------------------------------------- |
| Login (authenticate) ở Service | ❌ Không           | Trả về token, không dùng tới context sau đó                             |
| API có kèm token ở PreFilter   | ✅ Có              | Controller cần xử lý `@PreAuthorize` hoặc lấy `username`, `id` từ token |

---

## 🔧 Cấu hình môi trường

### File `application.yml`

```yaml
spring:
  profiles:
    active: dev
```

> **Note:** Mặc định đúng là `@spring.profiles.active@` để khi build bằng Maven có thể chỉ định môi trường

### Maven Build Commands

```bash
# Build với profile cụ thể
mvn package -P test
mvn clean package -P dev

# Build với nhiều profile
mvn clean package -P test,dev

# Build ngoại trừ môi trường
mvn clean package -P !dev
```

### File test CORS

File `call_api_cors.html` để chạy thử CORS trên FE call tới API backend test.

---

## 📊 P6Spy - SQL Logger

Giúp log SQL dễ xem hơn.

### Cấu hình cần thiết:

1. Tạo file `spy.properties`
2. Thêm config vào `application-dev.yml`
3. Config class `CompactSqlFormatter` trong package `config`

### Output mẫu:

```sql
[SQL]
ExecutionTime: 3ms | Connection: 0 | UserServiceImpl.saveUser:85 |
insert into tbl_address (address_type, apartment_number, building, city, country,
created_at, created_by, floor, street, street_number, updated_at, updated_by, user_id)
values (1, 'K13', 'Sunrise City', 'Ho Chi Minh', 'Vietnam',
'2026-01-27T08:26:12.382+0700', NULL, '12', 'Nguyen Huu Tho', '123',
'2026-01-27T08:26:12.382+0700', NULL, 70)
```

---

## 📖 Swagger API Documentation

### Truy cập Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

### Export sang Postman

1. Bấm vào `/v3/api-docs/api-service-1` để xem JSON
2. Lưu file (như `api-document-get-from-swagger.json` trong thư mục)
3. Import vào Postman

> Dependency: OpenAPI (có kèm Swagger)

---

## 🔗 API Endpoints

### User CRUD

| Method   | Endpoint                     | Mô tả                                        |
| -------- | ---------------------------- | -------------------------------------------- |
| `POST`   | `/user/`                     | Tạo user mới                                 |
| `PUT`    | `/user/{id}`                 | Update user                                  |
| `PATCH`  | `/user/{id}?status={status}` | Thay đổi status (NONE \| ACTIVE \| INACTIVE) |
| `DELETE` | `/user/{id}`                 | Xóa user                                     |
| `GET`    | `/user/{id}`                 | Lấy thông tin user                           |

### Phân trang & Tìm kiếm

#### 1. List với 1 tiêu chí sort

```
GET /user/list?pageNo=1&pageSize=10&sortBy=lastName:asc
```

#### 2. List với nhiều tiêu chí sort

```
GET /user/list-order-with-multiple-columns?pageNo=1&pageSize=10&sortBy=lastName:asc,id:desc
```

#### 3. List với EntityManager (customize query)

```
GET /user/list-order-with-multiple-columns-and-search?pageNo=0&pageSize=10&search=th&sortBy=id:asc
```

#### 4. List với Criteria

> Sort 1 cột, search (nhiều field của User), 1 field của bảng đã join là Address

```
GET /user/list-advance-search-with-specification?page=0&size=5&sort=id&user=firstName~a&address=city~a
```

#### 5. List với Specification

> Sort của pageable, search nhiều field dựa vào Spec join 2 column. Tự custom toán tử và join 2 bảng qua AND/OR

```
GET /user/list-advance-search-with-specification?page=0&size=5&sort=id&user=firstName~a&address=city~a,street~T
```

**Lưu ý các trường hợp:**
| TH | Điều kiện | Xử lý |
|----|-----------|-------|
| 1 | Không truyền user và address | Spring `findAll` với pageable → tự sort |
| 2 | Chỉ có user | `findAll` với Spec và pageable → tự sort |
| 3 | Có cả user và address | Dùng EntityManager → phải custom từng cái (page, size đã làm, **sort chưa implement**) |

> ⚠️ **TH3: Sort không hoạt động!**

---

## 🔐 Mô hình phân quyền RBAC

### So sánh mô hình

| Mô hình  | Tên đầy đủ                | Use case                     |
| -------- | ------------------------- | ---------------------------- |
| **RBAC** | Role-Based Access Control | Outsourcing, Ngân hàng       |
| **ACL**  | Access Control List       | Thương mại điện tử: AWS, ... |

> Dự án này sử dụng mô hình **RBAC**

### 👥 Roles

| Role       | Mô tả                               | Phạm vi                                             |
| ---------- | ----------------------------------- | --------------------------------------------------- |
| `sysadmin` | Quản trị hệ thống: IT, phần cứng    | Toàn hệ thống, **KHÔNG** thao tác nghiệp vụ         |
| `admin`    | Full quyền nghiệp vụ (CEO, Tổng GĐ) | Nghiệp vụ kinh doanh, **KHÔNG** điều chỉnh hệ thống |
| `manager`  | Teamlead, Trưởng bộ phận            | Phòng ban                                           |
| `user`     | Nhân viên thường                    | Xem, Thêm, Sửa (không xóa)                          |

### 🔑 Permissions

| Permission    | Mô tả                             | Ai thường có?        |
| ------------- | --------------------------------- | -------------------- |
| `Full Access` | Đủ tất cả quyền                   | sysadmin             |
| `View`        | Xem dữ liệu                       | user                 |
| `Add`         | Thêm bản ghi                      | user, manager        |
| `Update`      | Cập nhật bản ghi                  | user, manager        |
| `Delete`      | Xóa bản ghi                       | admin                |
| `Upload`      | Tải lên tài liệu                  | admin, user, manager |
| `Import`      | Insert hàng loạt (Excel)          | admin, manager, user |
| `Export`      | Xuất báo cáo, Excel               | manager, CEO         |
| `Send`        | Gửi                               | -                    |
| `Share`       | Chia sẻ (gán quyền xem, sửa file) | -                    |

> **💡 Lưu ý về Add/Update trong ngân hàng:**
>
> - Outsource thường gộp chung thành "Edit"
> - Tín dụng tách riêng: Chuyên viên tạo hồ sơ, nhưng phải có Thẩm định viên/Giám sát viên/Manager để **Approve**

---

## 🔒 Spring Security + JWT Flow

> Khi tích hợp Spring Security với JWT cho xác thực stateless

### Giai đoạn 1: Đăng nhập

#### Request

```http
POST /auth/access
Content-Type: application/json

{
  "username": "sysadmin",
  "password": "123456"
}
```

#### Flow chi tiết

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant AuthService
    participant AuthManager
    participant DaoAuthProvider
    participant UserDetailsService
    participant DB

    Client->>Controller: POST /auth/access
    Controller->>AuthService: authenticate()
    AuthService->>AuthManager: authenticate(UsernamePasswordToken)
    AuthManager->>DaoAuthProvider: authenticate()
    DaoAuthProvider->>UserDetailsService: loadUserByUsername()
    UserDetailsService->>DB: SELECT * FROM tbl_user WHERE username = ?
    DB-->>UserDetailsService: User data
    UserDetailsService-->>DaoAuthProvider: UserDetails
    DaoAuthProvider->>DaoAuthProvider: So sánh password với PasswordEncoder
    DaoAuthProvider-->>AuthService: Authentication (đã xác thực)
    AuthService->>AuthService: Tạo JWT Token
    AuthService-->>Controller: Token
    Controller-->>Client: Response with Token
```

| Bước | Mô tả                                                                                              |
| ---- | -------------------------------------------------------------------------------------------------- |
| 1.1  | Controller nhận request, gọi `AuthenticationService.authenticate()`                                |
| 1.2  | Tạo `UsernamePasswordAuthenticationToken`, truyền vào `authenticationManager.authenticate()`       |
| 1.3  | `DaoAuthenticationProvider` gọi `loadUserByUsername()` → **Query lần 1**                           |
| 1.4  | So sánh mật khẩu với `PasswordEncoder`                                                             |
| 1.5  | ⚠️ **Truy vấn dư thừa**: Code hiện tại gọi lại `userRepository.findByUsername()` → **Query lần 2** |
| 1.6  | Tạo JWT token và trả về client                                                                     |

> **Kết thúc:** Client có token, server không lưu session (`SessionCreationPolicy.STATELESS`)

---

### Giai đoạn 2: Gọi API được bảo vệ

#### Request

```http
GET /user/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

#### Flow chi tiết

| Bước | Mô tả                                                                     |
| ---- | ------------------------------------------------------------------------- |
| 2.1  | Endpoint `/user/1` không nằm trong `WHITE_LIST` → cần xác thực            |
| 2.2  | `PreFilter.doFilterInternal()` xử lý token                                |
| 2.3  | Load user từ token → **Query lần 3**                                      |
| 2.4  | Controller gọi `userService.getUser(1L)` → **Query lần 4**                |
| 2.5  | Jackson serialize, kích hoạt lazy load `getAddresses()` → **Query lần 5** |

#### PreFilter Logic

```java
// Trong PreFilter.doFilterInternal()
1. Lấy header Authorization
2. Nếu rỗng hoặc không có "Bearer " → bỏ qua, Spring Security chặn (401)
3. Nếu có token hợp lệ:
   - Trích xuất username từ JWT subject
   - Kiểm tra SecurityContext đã có authentication chưa
   - Gọi UserDetailsService.loadUserByUsername()
   - Xác minh token (thời hạn, chữ ký)
   - Tạo Authentication và lưu vào SecurityContextHolder
```

---

### 📊 Tổng kết Query

| #   | Query                                       | Giai đoạn                      |
| --- | ------------------------------------------- | ------------------------------ |
| 1   | `SELECT FROM tbl_user WHERE username = ?`   | Login - xác thực (bắt buộc)    |
| 2   | `SELECT FROM tbl_user WHERE username = ?`   | Login - **dư thừa** ⚠️         |
| 3   | `SELECT FROM tbl_user WHERE username = ?`   | PreFilter - load user từ token |
| 4   | `SELECT FROM tbl_user WHERE id = ?`         | Controller - getUser           |
| 5   | `SELECT FROM tbl_address WHERE user_id = ?` | Lazy load addresses            |

> **Tổng:** 5 queries cho 2 requests (1 login + 1 API call)

### 📝 Lưu ý quan trọng

- ✅ Mọi request có token đều đi qua `PreFilter`
- ✅ Endpoint yêu cầu xác thực **BẮT BUỘC** phải có token hợp lệ
- ✅ Các request trong `WHITE_LIST` (như `/auth/access`, `/swagger-ui/**`) không bị chặn

---

## 🌐 Internationalization

Có thể truyền thêm header để thay đổi ngôn ngữ:

```http
Accept-Language: vi-VN
Accept-Language: en-US
Accept-Language: mx-MX
```

---

## 📐 Architecture Diagram

<img width="638" height="393" alt="Architecture" src="https://github.com/user-attachments/assets/101f06b8-4dd0-420c-855f-660a2c31ac60" />

---

> 📅 _Last updated: January 2026_
