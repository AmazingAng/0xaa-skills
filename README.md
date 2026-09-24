# 0xAA Skills

个人维护的 Agent Skills。每个技能独立放在 `skills/<name>/`，携带自己的说明、辅助脚本和必要模板。

## 技能目录

| 技能 | 用途 |
| --- | --- |
| [promo-video](skills/promo-video/SKILL.md) | 使用 Remotion 制作产品宣传视频，可结合 xAPI 视频生成和 Jitter/Lottie 动效；支持文案审阅、已有视频调整和新视频制作。 |

## 使用

通过你使用的 Agent 工具安装 `skills/promo-video/` 整个目录，保留其中的相对路径。技能入口是 `SKILL.md`。

也可以直接创建独立的 Remotion 项目：

```bash
python3 skills/promo-video/scripts/init_project.py /path/to/new-promo
cd /path/to/new-promo
npm install
npm run studio
npm run render:zh
```

模板使用中性演示文案、系统字体和代码动画，无需 API Key 或外部素材即可渲染。它是可修改的工程起点，不是固定分镜或视觉风格。

运行环境：Node.js 22+、npm、Python 3；提取检查图需安装 FFmpeg。首次渲染时 Remotion 可能需要下载浏览器。

## 内容边界

本仓库只保存可复用的技能、模板和脚本。个人账户配置、API 凭据、任务记录、原始业务数据、品牌媒体及宣传片成片不随技能分发。xAPI 是可选的素材生成服务，使用者自行配置认证；不包含原项目中的账号或素材。
