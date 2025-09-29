# Express TypeScript Server

A robust Express.js server built with TypeScript, featuring OpenAI integration, Swagger documentation, and comprehensive testing.

## Features

- **Express.js** - Fast, unopinionated, minimalist web framework
- **TypeScript** - Strongly typed JavaScript for better development experience
- **OpenAI Integration** - AI-powered functionality with OpenAI API
- **Swagger Documentation** - Interactive API documentation
- **Nodemon** - Auto-restart development server on file changes
- **Jest** - Testing framework with TypeScript support
- **Winston** - Professional logging library with multiple transports
- **Environment Configuration** - Separate configs for development, test, and production

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key (for AI features)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests with environment file
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run clean` - Remove build directory

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
OPENAI_API_KEY=your_openai_api_key_here
```

## API Documentation

Interactive API documentation is available via Swagger UI when the server is running:
- Development: `http://localhost:3000/api-docs`

## Project Structure

```
src/
├── routes/             # Route modules
├── middleware/         # Custom middleware
├── utils/             # Utility functions
├── __tests__/         # Test files
├── index.ts           # Main server file
dist/                  # Compiled JavaScript (generated)
coverage/             # Test coverage reports (generated)
logs/                 # Application logs (generated)
.env                   # Environment variables
.env.test             # Test environment variables
.env.example          # Environment template
```

## Logging

The application uses Winston for structured logging with multiple levels:

- **error** - Error conditions
- **warn** - Warning conditions  
- **info** - Informational messages
- **http** - HTTP request/response logs
- **debug** - Debug information

Logs are written to:
- **Console** - Colored output for development
- **logs/combined.log** - All log levels in JSON format
- **logs/error.log** - Error logs only in JSON format

## Testing

The project uses Jest with TypeScript support and separate test environment configuration.

Run tests:
```bash
npm test
```

For test coverage:
```bash
npm run test:coverage
```

Tests use the `.env.test` file for environment-specific configuration.

## Development

The server runs on `http://localhost:3000` by default. You can change the port by setting the `PORT` environment variable.

## Technologies Used

- **Backend**: Express.js, TypeScript, Node.js
- **AI Integration**: OpenAI API
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Logging**: Winston
- **Development**: Nodemon, ts-node

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request