# Contact Form PostgreSQL Project

## Project Overview

This is a Node.js web application that provides a contact form interface for managing contacts in a PostgreSQL database. The application allows users to add, list, and delete contacts while maintaining data integrity through database constraints.

**Key Technologies Used:**
- Node.js with Express framework
- PostgreSQL database
- HTML, CSS, and JavaScript for frontend
- dotenv for environment configuration
- pg library for PostgreSQL connectivity

**High-level Architecture:**
The application follows a standard web application architecture with:
- A frontend interface (HTML/CSS/JS) served by Express
- A backend API (RESTful endpoints) handling business logic
- Database layer (PostgreSQL) for data persistence
- Environment configuration management

## Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- PostgreSQL database
- npm package manager

### Installation Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy the example environment file: `cp .env.example .env`
4. Configure your PostgreSQL connection in `.env`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/database_name
   ```
5. Create the database table: `psql "$DATABASE_URL" -f schema.sql`

### Basic Usage Examples
- Start the application: `npm start`
- Access the form at http://localhost:3000
- The form submits data to `POST /api/contacts` endpoint

### Running Tests
This project does not appear to have a dedicated test suite. All functionality can be tested manually through the web interface.

## Project Structure

```
.
├── .dockerignore
├── .env.example
├── Dockerfile
├── README.md
├── apropos.html          # About page
├── docker-compose.yml
├── index.html            # Main contact form page
├── list.html             # Contact listing page
├── list.js               # JavaScript for contact listing
├── package-lock.json
├── package.json
├── schema.sql            # Database schema definition
├── script.js             # JavaScript for main form
├── server.js             # Main application entry point
└── styles.css            # CSS styling
```

**Key Files and Their Roles:**
- `server.js`: Main application logic, API endpoints, database connections
- `schema.sql`: Database table definition
- `index.html` & `script.js`: Contact form interface
- `list.html` & `list.js`: Contact listing interface
- `styles.css`: Styling for all pages

## Development Workflow

### Coding Standards
- Uses ES6+ JavaScript modules (`import`/`export`)
- Follows RESTful API conventions
- Implements proper error handling and validation
- Uses parameterized queries to prevent SQL injection

### Testing Approach
- Manual testing through web interface
- Input validation for all form fields
- Database constraint enforcement (unique email, required fields)
- Error responses with appropriate HTTP status codes

### Build and Deployment Process
1. Install dependencies: `npm install`
2. Configure database connection in `.env`
3. Create database schema: `psql "$DATABASE_URL" -f schema.sql`
4. Start application: `npm start`

### Contribution Guidelines
Since this is a small project, contributions should:
- Maintain existing code style and structure
- Ensure all tests pass (manual verification)
- Add appropriate comments for complex logic
- Follow the established patterns in the codebase

## Key Concepts

**Domain Terminology:**
- **Contact**: A person with name, first name, email, and phone number
- **API Endpoint**: RESTful routes for CRUD operations (`/api/contacts`)
- **Database Pool**: Connection pooling for PostgreSQL connections
- **Parameterized Queries**: SQL queries that prevent injection attacks

**Core Abstractions:**
- Contact model represented as a database table with constraints
- Express.js server handling HTTP requests and responses
- PostgreSQL connection pool managing database connections efficiently

**Design Patterns Used:**
- RESTful API design pattern for endpoints
- Connection pooling for database management
- Middleware pattern for request processing (Express.js)
- Separation of concerns between frontend and backend

## Common Tasks

### Adding a New Contact
1. Navigate to the main form page (`index.html`)
2. Fill in all required fields (name, first name, email, phone number)
3. Submit the form
4. The data will be saved to the PostgreSQL database

### Viewing Contacts
1. Navigate to `list.html`
2. View contacts in a table format
3. Use pagination and search functionality to filter results

### Modifying Database Schema
1. Update `schema.sql` with desired changes
2. Run: `psql "$DATABASE_URL" -f schema.sql`
3. Restart the application if needed

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Update `DATABASE_URL` with your PostgreSQL connection string
3. Ensure all environment variables are properly set

## Troubleshooting

### Database Connection Issues
- Verify that PostgreSQL is running
- Check that `DATABASE_URL` in `.env` is correctly formatted
- Ensure the database user has proper permissions
- Confirm that the database exists

### Form Validation Errors
- All fields are required and must not be empty
- Email format validation: must match standard email pattern
- Phone number should be a valid phone number format
- Duplicate email addresses will cause a 409 Conflict error

### Server Issues
- Ensure Node.js is properly installed
- Check that all dependencies are installed (`npm install`)
- Verify port is not already in use (default is 3000)
- Check console output for specific error messages

## References

**Important Documentation:**
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pg Node.js PostgreSQL Library](https://node-postgres.com/)

**Related Resources:**
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [Web Security Best Practices](https://cheatsheetseries.owasp.org/)