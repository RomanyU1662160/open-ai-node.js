# 🤖 AI Model Configuration Guide

## Quick Model Switching

To switch between AI models, simply update the `OPENAI_MODEL` variable in your `.env` file:

### Available Models

```bash
# 💰 Most Cost-Effective (Default)
OPENAI_MODEL=meta-llama/Meta-Llama-3.1-8B-Instruct  # $0.02/M Input, $0.05/M Output

# 🚀 High Performance
OPENAI_MODEL=openai/gpt-oss-120b                    # $0.08/M Input, $0.44/M Output

# ⚡ Premium Fast Model
OPENAI_MODEL=gpt-5-nano                             # $0.05/M Input, $2.00/M Output
```

## How to Switch Models

1. **Edit `.env` file:**
   ```bash
   # Comment out current model
   # OPENAI_MODEL=meta-llama/Meta-Llama-3.1-8B-Instruct

   # Uncomment desired model
   OPENAI_MODEL=openai/gpt-oss-120b
   ```

2. **Server auto-reloads** with nodemon (no restart needed)

3. **Verify in logs:**
   ```
   SELECTED_MODEL:::>>> openai/gpt-oss-120b
   ```

## Model Comparison

| Model | Input Cost | Output Cost | Best For |
|-------|------------|-------------|----------|
| **Meta-Llama-3.1-8B** | $0.02/M | $0.05/M | General use, cost-effective |
| **GPT-OSS-120B** | $0.08/M | $0.44/M | Complex tasks, balanced performance |
| **GPT-5-Nano** | $0.05/M | $2.00/M | Fast responses, premium quality |

## Environment Variables

- `OPENAI_MODEL`: Current active model
- `ABACUS_API_KEY`: Your API key
- `OPEN_API_BASE_URL`: Base URL for the API

*Note: Server will use Meta-Llama-3.1-8B-Instruct as fallback if no model is specified.*