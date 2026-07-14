# Qubica AMF Challenge - E-commerce Demo

> [Qubica Challenge](https://qubicainterviewfunctions.azurewebsites.net/api/qubicaamf/interview/Pietro/frontend/junior)


## Introduction

> I usually write comments and everything in English since it is a more understandable language

Let's build a small e-commerce web app for browsing products and categorie.

This app is built with Vue 3, TypeScript and the [Fake Store API](https://fakestoreapi.com/docs).

<hr />

> You may wonder how do I work? Here I am to answer.

I usually work in this way:
1. the task come into my hands
2. truncate the main problem into different smaller problems (usually do this on paper)
3. find at least 2 or 3 solutions for each minor problem (do not write code yet)
4. sleep on it
5. start to implement

Point 4, *sleep on it*, could sound like a joke, but it is not!
It is one of the most important steps: fresh mind lead to more valuable solutions.

If you write a good task list at first, then the coding part will be less annoying to handle.

## Git Flow

> From the first day I started using `git`, I also started using `git flow`, which is mandatory in all my projects.

> Git Flow is a branching model and toolset (a set of git extensions) created by Vincent Driessen for managing larger projects with structured releases. It defines a strict branching strategy and provides high-level commands to automate common operations.

| Action               | Command                                   |
|----------------------|-------------------------------------------|
| Initialize git flow  | `git flow init`                           |
| Start feature        | `git flow feature start <name>`           |
| Finish feature       | `git flow feature finish <name>`          |
| Publish feature      | `git flow feature publish <name>`         |
| Pull feature         | `git flow feature pull origin <name>`     |
| List features        | `git flow feature list`                   |
| Start release        | `git flow release start <version>`        |
| Finish release       | `git flow release finish <version>`       |
| List releases        | `git flow release list`                   |
| Start hotfix         | `git flow hotfix start <version>`         |
| Finish hotfix        | `git flow hotfix finish <version>`        |
| List hotfixes        | `git flow hotfix list`                    |
| Start support branch | `git flow support start <version> <base>` |

### Initialization

```bash
cd my-project
git flow init
```

You'll be prompted to configure branch names and prefixes:

```
Branch name for production releases: [main]
Branch name for "next release" development: [develop]
Feature branch prefix: [feature/]
Bugfix branch prefix: [bugfix/]
Release branch prefix: [release/]
Hotfix branch prefix: [hotfix/]
Support branch prefix: [support/]
Version tag prefix: []
```


### Feature Branches

Used for developing new features. Never interact directly with `main`.

#### Start a feature
```bash
git flow feature start my-feature
```
Equivalent to:
```bash
git checkout -b feature/my-feature develop
```

#### Work normally
```bash
git add .
git commit -m "Implement my-feature"
```

#### Publish a feature (share with others / back it up remotely)
```bash
git flow feature publish my-feature
```

#### Pull a feature published by someone else
```bash
git flow feature pull origin my-feature
```

#### Finish a feature
```bash
git flow feature finish my-feature
```
This:
1. Merges `feature/my-feature` into `develop`
2. Deletes the feature branch
3. Switches you back to `develop`

#### List all feature branches
```bash
git flow feature list
```

---

### Release Branches

Used to prepare a new production release — final testing, version bumps, minor bug fixes, documentation. No new features are added here.

#### Start a release
```bash
git flow release start 1.2.0
```
Branches from `develop` → creates `release/1.2.0`.

#### Optionally publish it
```bash
git flow release publish 1.2.0
```

#### Make final adjustments
```bash
# bump version numbers, update changelog, etc.
git commit -am "Bump version to 1.2.0"
```

#### Finish a release
```bash
git flow release finish 1.2.0
```

This:
1. Merges `release/1.2.0` into `main`
2. Tags the merge commit on `main` with the version (e.g. `1.2.0`)
3. Merges `release/1.2.0` back into `develop` (so fixes made during release aren't lost)
4. Deletes the `release/1.2.0` branch

> You'll typically be prompted for a tag message. After finishing, don't forget to push everything:
```bash
git push origin main develop --tags
```

### Hotfix Branches

Used to quickly patch production issues without disrupting ongoing development on `develop`.

#### Start a hotfix
```bash
git flow hotfix start 1.2.1
```
Branches from `main` → creates `hotfix/1.2.1`.

#### Fix the issue
```bash
git commit -am "Fix critical bug in payment processing"
```

#### Finish the hotfix
```bash
git flow hotfix finish 1.2.1
```
This:
1. Merges `hotfix/1.2.1` into `main`
2. Tags it on `main` (e.g. `1.2.1`)
3. Merges it into `develop` (or the active `release/*` branch, if one exists)
4. Deletes the hotfix branch

Push after finishing:
```bash
git push origin main develop --tags
```

## IA Usage Disclaimer

IA is being used to:
- automate boring code tasks, i.e. write similar API call for the product
- ask pieces of advice, i.e. better format elements on the header,
- code review

I usually have conversations with IA agents: this helps me write better code solutions while keep up to me the way I want to implement everything.

## Getting started

Requirements:
- Node.js major than version 20
- `npm`

Optional:
- JetBrains's WebStorm code editor (I really love it)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Run unit tests
npm run test

# 4. Type-check and build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

## Login/Logout

The app authenticates against the real Fake Store API (`POST /auth/login`), which only accepts  a fixed set of seeded users.
For a short term approach, there is no sign-up.
On the Login page, click **"Fill demo  credentials"** to autofill a working test account (`mor_2314` / `83r5^_`), or use any other sername/password pair from the [Fake Store users list](https://fakestoreapi.com/users).

The Cart and Wishlist pages are behind a route guard and require being logged in.
Visiting them  while logged out redirects to `/login?redirect=...` and returns you to the original page after a  successful login.

## Features
- **Header**: store name/logo, category navigation (fetched from the API), cart/wishlist counters, theme toggle, login/logout.
- **Home**: product grid fetched from the API. Clicking a category in the header filters the grid and updates the URL as `?category=<slug>`. Reloading or deep-linking to a filtered URL restores the same filter. Product cards are fully clickable and link to the detail view.
- **Product detail**: image, title, price, rating, full description, quantity picker, "Add to Cart"  toggle.
- **Auth**: login/logout backed by the Fake Store API; session persisted in `localStorage`.
- **Cart**: quantity management, totals, remove/clear — persisted client-side in `localStorage` so a refresh doesn't lose the cart.
- **Loading & error states**: skeleton loaders for the product grid and detail view, and a global "Something went wrong" modal for network/API failures.
- **Light/dark theme**, following the OS preference by default and toggleable/persisted.
- **Accessibility**: semantic landmarks, a skip-to-content link, labeled form controls, focus-visible  styles, `alt` text on every product image, and keyboard-operable navigation/menus.

## Project structure

```
src/
  - components/
    - layout/      # AppHeader, ThemeToggle
    - product/     # ProductCard, ProductCardSkeleton
    - common/      # ErrorModal, LoadingSpinner
  - views/         # HomeView, ProductDetailView, LoginView, CartView, NotFoundView
  - stores/        # Pinia stores: auth, cart, theme, catalog, ui
  - services/      # Axios instance + Fake Store API calls
  - router/        # Route definitions + auth guard
  - types/         # Shared TypeScript interfaces (Product, Cart, Auth, ...)
  - styles/        # SCSS design tokens, theme variables, mixins
  - utils/         # Small pure helpers (formatPrice, formatCategoryLabel, storage)
  - __tests__/     # Vitest unit tests (if I have time to)
```
