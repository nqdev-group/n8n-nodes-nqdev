# pnpm Command

## Start n8n-nodes via pnpm

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

- `pnpm i`: Cài đặt các gói phụ thuộc.
- `cls ; npm run lint -- --fix`: Xóa màn hình và chạy lint để kiểm tra + sửa lỗi mã.
- `pnpm run prepublishOnly`: Chuẩn bị trước khi xuất bản gói.
- `pnpm run build`: Biên dịch/xây dựng dự án.
- `pnpm run dev`: Chạy thử nghiệm (dev) dự án.

## Test your node

    - https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/

You can test your node as you build it by running it in a local n8n instance.

1. Install n8n using npm

   ```bash
   npm install n8n -g
   ```

2. When you are ready to test your node, publish it locally
   ```bash
   # In your node directory
   npm run build
   npm link
   ```
3. Install the node into your local n8n instance
   ```bash
   # In the nodes directory within your n8n installation
   # node-package-name is the name from the package.json
   npm link <node-package-name>
   ```
4. Check your directory

   ```markdown
   Make sure you run npm link <node-name> in the nodes directory within your n8n installation. This can be:

   - `~/.n8n/custom/`
   - `~/.n8n/<your-custom-name>`: if your n8n installation set a different name using `N8N_CUSTOM_EXTENSIONS`.
   ```

5. Start n8n
   ```bash
   n8n start
   ```

### Troubleshooting

- There's no custom directory in `~/.n8n` local installation.

You have to create `custom` directory manually and run `npm init`

```bash
# In ~/.n8n directory run
mkdir custom
cd custom
npm init
```

## Deploy your node | Install private nodes

    - [Install private nodes](https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/)

You can build your own nodes and install them in your n8n instance without publishing them on npm. This is useful for nodes that you create for internal use only at your company.
