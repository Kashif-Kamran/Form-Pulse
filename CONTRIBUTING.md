# Contributing to Form-Pulse

We love your input! We want to make contributing to Form-Pulse as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/your-username/form-pulse/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/your-username/form-pulse/issues/new).

### Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/form-pulse.git
cd form-pulse
```

2. Install dependencies

```bash
yarn install
```

3. Set up environment variables

```bash
cp apps/server/.env.example apps/server/.env
# Edit the .env file with your local configuration
```

4. Start development servers

```bash
yarn dev
```

## Code Style

We use ESLint and Prettier for code formatting. Please ensure your code passes linting:

```bash
yarn lint
yarn format
```

### TypeScript Guidelines

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use proper typing, avoid `any` when possible
- Follow existing naming conventions

### React Guidelines

- Use functional components with hooks
- Use React Hook Form for form handling
- Follow the existing component structure
- Use Tailwind CSS for styling

### Backend Guidelines

- Follow NestJS best practices
- Use DTOs for request/response validation
- Implement proper error handling
- Use dependency injection patterns

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage

```bash
# Run tests
yarn test

# Backend tests
cd apps/server
yarn test
yarn test:e2e

# Frontend tests (when available)
cd apps/web
yarn test
```

## Commit Messages

We follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat(diet): add diet plan creation form
fix(auth): resolve JWT token refresh issue
docs(readme): update installation instructions
```

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
