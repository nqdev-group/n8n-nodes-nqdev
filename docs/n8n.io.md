# n8n.io

    https://www.npmjs.com/package/n8n
    nodes-base: https://github.com/n8n-io/n8n/tree/master/packages/nodes-base
      Twilio: https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Twilio
      Sms77: https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Sms77
    Integrations: https://docs.n8n.io/integrations/

## Integrations

- [Build a node](https://docs.n8n.io/integrations/creating-nodes/build/)
  - [Standard parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/)

## Code in n8n

- [Code in n8n](https://docs.n8n.io/code/code-node/)

## Hosting n8n

- [Hosting n8n](https://docs.n8n.io/hosting/)
  - [API reference](https://docs.n8n.io/api/api-reference/)

## REST API

- [n8n public REST API](https://docs.n8n.io/api/)

## `n8n-nodes-nqdev-*` Directory Structure

```yaml
n8n-nodes-nqdev-starter
│
├── .github/              # Thư mục chứa các file cấu hình GitHub (ví dụ: GitHub Actions, workflows)
├── .vscode/              # Thư mục chứa các cấu hình VSCode (ví dụ: settings, extensions)
│
├── dist/                  # Thư mục chứa các tệp biên dịch đã hoàn thành
│   └── <output_files>     # Các file đã biên dịch (code js đã được transpile)
│
├── credentials/                     # Thư mục chứa các tệp cấu hình chứng thực (nếu có)
│
├── nodes/                                  # Thư mục chứa các node của bạn
│   ├── <node_name>/
│   │   ├── <node_name>Node.ts              # Tệp chính mô tả node
│   │   ├── <node_name>Node.credentials.ts  # Cấu hình credential nếu cần
│   │   └── <node_name>Node.ui.ts           # Định nghĩa giao diện người dùng (UI)
│   │
│   └── ExampleNode/                    # Thư mục cho một node cụ thể
│       ├── ExampleNode.ts              # Tệp chính định nghĩa logic của node
│       ├── ExampleNode.credentials.ts  # Cấu hình credentials nếu có
│       ├── ExampleNode.ui.ts           # Định nghĩa giao diện người dùng cho node này
│       ├── ExampleNode.description.ts  # Mô tả về chức năng của node
│       └── ExampleNode.settings.ts     # (Tuỳ chọn) Tùy chỉnh cấu hình hoặc cài đặt cho node
│
├── package.json              # Tệp cấu hình dự án
├── tsconfig.json             # Cấu hình TypeScript
├── README.md                 # Tài liệu mô tả về node này
├── .editorconfig             # Tệp cấu hình cho các công cụ chỉnh sửa mã (editor config)
├── .eslintrc.js              # Cấu hình cho ESLint (kiểm tra mã nguồn)
├── .eslintrc.prepublish.js   # Cấu hình cho ESLint trước khi xuất bản
├── .gitignore                # Cấu hình loại bỏ các file không cần thiết khi commit
├── .npmignore                # Liệt kê các tệp/thư mục cần loại trừ khỏi npm package
├── .prettierrc.js            # Cấu hình cho Prettier (formatter mã nguồn)
│
├── gulpfile.js               # Tệp cấu hình cho Gulp (build system)
├── index.js                  # Tệp entry point (có thể trống)
├── package.json              # Tệp cấu hình npm, chứa thông tin về dự án và các dependencies
├── pnpm-lock.yaml            # Tệp lock của pnpm (nếu sử dụng pnpm làm package manager)
└── tsconfig.json             # Cấu hình TypeScript
```

## News

- [MCP Client tool & MCP Trigger nodes](https://community.n8n.io/t/we-re-adding-mcp-client-tool-mcp-trigger-nodes-try-them-now/99338)
  - [GH: n8n-nodes-mcp](https://github.com/nerding-io/n8n-nodes-mcp)
