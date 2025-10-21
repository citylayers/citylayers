# CityLayers Architecture & Coding Principles

## 📐 Coding Principles

### 1. OOP First
- Object-oriented design with clear class hierarchies
- Inheritance and composition over procedural code
- Encapsulation of behavior and state

### 2. Design Patterns
Apply industry-standard patterns where appropriate:
- **MVC Pattern** - Separation of concerns (Models, Views, Controllers)
- **Repository Pattern** - Data access abstraction
- **Factory Pattern** - Object creation logic
- **Strategy Pattern** - Interchangeable algorithms
- **Builder Pattern** - Complex object construction
- **Template Method** - Defined algorithm skeletons
- **Singleton Pattern** - Single instance management
- **Dependency Injection** - Loose coupling

### 3. SOLID Principles

**S - Single Responsibility Principle**
- Each class has one reason to change
- Separate concerns (e.g., ProjectService, ProjectRepository, ProjectController)

**O - Open/Closed Principle**
- Open for extension, closed for modification
- BaseComponent/ContentPanel can be extended without changes

**L - Liskov Substitution Principle**
- Derived classes are substitutable for base classes
- All ContentPanel subclasses work wherever ContentPanel is expected

**I - Interface Segregation Principle**
- Clients shouldn't depend on interfaces they don't use
- Small, focused interfaces over monolithic ones

**D - Dependency Inversion Principle**
- Depend on abstractions, not concrete implementations
- Services depend on Repository interfaces, not specific implementations

### 4. No Hardcoded Strings
- All constants in enums and constant files
- Type-safe configuration management
- Centralized constant definitions

### 5. Type Safety
- 100% TypeScript coverage
- Explicit type annotations where needed
- Avoid `any` type unless absolutely necessary

### 6. Separation of Concerns
- 6-layer architecture (see below)
- Clear boundaries between layers
- Each layer has specific responsibilities

## 🏗️ Architecture Overview

### Server-Side Architecture (6 Layers)

```
HTTP Request
    ↓
Validation Middleware ────── Request validation & sanitization
    ↓
Controller ──────────────── HTTP handling, request/response
    ↓
Service ─────────────────── Business logic, orchestration
    ↓
Repository ──────────────── Data access, database operations
    ↓
QueryBuilder/Constants ───── Query construction, query management
    ↓
Database (Neo4j)
```

### Client-Side Architecture

```
Page Component (Panel)
    ↓
BaseComponent/ContentPanel ─── Base classes with Template Method pattern
    ↓
UI Components ───────────────── Reusable components (buttons, inputs, etc.)
    ↓
DOM Manipulation
```

### Key Architectural Decisions

**Server-Side:**
- **Controllers**: Handle HTTP requests/responses only
- **Services**: Contain business logic, orchestrate repositories
- **Repositories**: Manage data access, query execution
- **Middleware**: Cross-cutting concerns (validation, error handling, CORS)
- **Config/Constants**: Centralized configuration and constants

**Client-Side:**
- **BaseComponent**: Template Method pattern for component lifecycle
- **ContentPanel**: Base class for panel components
- **Constants**: Enum-based classnames and IDs (no hardcoded strings)
- **TypeScript**: Full type safety throughout

## 📂 Project Structure

```
citylayers/
├── client/src/                     Client TypeScript source
│   ├── constants/                  Enums and constants
│   ├── types/                      TypeScript type definitions
│   ├── karta/                      Map-related logic
│   ├── services/                   API service clients
│   └── ui/
│       ├── component/              Reusable UI components
│       │   └── BaseComponent.ts    Base class with Template Method
│       ├── panel/                  Page-level panels
│       │   └── contentPanel.ts     Base class for panels
│       └── panelcomponent/         Sub-panel components
│
├── src/server/src/                 Server TypeScript source
│   ├── config/                     Configuration management
│   │   ├── Environment.ts          Environment variables
│   │   ├── PathConstants.ts        File paths
│   │   ├── RouteConstants.ts       API routes
│   │   └── DatabaseConfig.ts       Database config
│   ├── constants/                  Application constants
│   │   ├── FileTypes.ts
│   │   ├── HttpStatus.ts
│   │   └── GraphKeys.ts
│   ├── controllers/                HTTP request handlers
│   │   ├── BaseController.ts       Base controller class
│   │   ├── ProjectController.ts
│   │   ├── TeamController.ts
│   │   └── ...
│   ├── services/                   Business logic layer
│   │   ├── BaseService.ts          Base service class
│   │   ├── ProjectService.ts
│   │   └── ...
│   ├── repositories/               Data access layer
│   │   ├── BaseRepository.ts       Base repository class
│   │   ├── ProjectRepository.ts
│   │   └── ...
│   ├── middleware/                 Express middleware
│   │   ├── ValidationMiddleware.ts
│   │   ├── ErrorMiddleware.ts
│   │   └── ...
│   ├── database/                   Database utilities
│   │   ├── QueryBuilder.ts         Type-safe query construction
│   │   └── QueryConstants.ts       Centralized queries
│   └── app.ts                      Application bootstrap
│
├── public/js/                      Compiled client JavaScript (build output)
│   └── [mirrored from client/src]
│
├── neo4j/                          Neo4j deployment (separate)
│
└── docs/                           Historical refactoring docs
```

## 🔧 Build & Development

### TypeScript Compilation

**Client Build:**
```bash
npm run build:client
# Compiles client/src/**/*.ts → public/js/**/*.js
```

**Server Build:**
```bash
npm run build:server
# Compiles src/server/src/**/*.ts → dist/**/*.js
```

### Critical Rules

1. **Always edit TypeScript source files** (`.ts`), never compiled JavaScript (`.js`)
2. **Client edits**: Edit `client/src/`, then run `npm run build:client`
3. **Server edits**: Edit `src/server/src/`, then run `npm run build:server`
4. **Legacy JavaScript**: Some files in `public/js/` have no TypeScript source - edit those directly

## 🎯 Development Guidelines

### Adding New Features

**Server-Side Feature:**
1. Add constants to appropriate enum (`constants/` or `config/`)
2. Create/update Repository method for data access
3. Create/update Service method for business logic
4. Create/update Controller method for HTTP handling
5. Add route in `RouteConstants.ts` and wire in `app.ts`
6. Add validation middleware if needed

**Client-Side Feature:**
1. Add classnames/IDs to `constants/ClassNames.ts`
2. Create component extending `BaseComponent` or `ContentPanel`
3. Implement required lifecycle methods (`createElement`, `initExtra`, `load`)
4. Add to parent component's element list
5. Build and test

### Code Review Checklist

- [ ] No hardcoded strings (use enums/constants)
- [ ] Proper TypeScript types (no `any` unless necessary)
- [ ] Follows SOLID principles
- [ ] Single responsibility per class/method
- [ ] Meaningful variable/method names
- [ ] Comments for complex logic only
- [ ] No console.log in production code
- [ ] Error handling present
- [ ] Builds without errors

## 📚 Further Reading

- See `CLAUDE.md` for development timeline and session notes
- See `docs/` folder for detailed phase-by-phase refactoring history
- See `DEPLOYMENT.md` for GCP deployment instructions
- See `SETUP.md` for local development setup

---

*This document defines the architectural principles and patterns used throughout the CityLayers codebase.*
