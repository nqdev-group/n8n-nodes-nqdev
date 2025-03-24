> pnpm i
>
> -> Ý nghĩa: Đây là viết tắt của pnpm install. Lệnh này dùng để cài đặt tất cả các phụ thuộc (dependencies) được liệt kê trong file package.json của dự án.
>
> cls ; npm run lint -- --fix
>
> -> Ý nghĩa: Đây là hai lệnh được kết hợp trong một dòng, thường chạy trên Windows (vì cls là lệnh dành cho Windows).
>
> pnpm run prepublishOnly
>
> -> Ý nghĩa: Chạy script prepublishOnly được định nghĩa trong package.json.
>
> pnpm run build
>
> -> Ý nghĩa: Chạy script build được định nghĩa trong package.json.

## Tóm lại

- `pnpm i`: Cài đặt các gói phụ thuộc.
- `cls ; npm run lint -- --fix`: Xóa màn hình và chạy lint để kiểm tra + sửa lỗi mã.
- `pnpm run prepublishOnly`: Chuẩn bị trước khi xuất bản gói.
- `pnpm run build`: Biên dịch/xây dựng dự án.
