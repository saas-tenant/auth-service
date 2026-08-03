# Auth Service Architecture

## Overview

The Auth Service is responsible for:

- Authentication
- Authorization
- Session Management
- Multi-tenancy
- RBAC

---

## Architecture

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

---

## Principles

- Feature-first architecture
- Repository pattern
- Event-driven communication
- Thin controllers
- Rich services
- No business logic in controllers
- Infrastructure isolated from domain