# Pharoahs-Way

A comprehensive tourism platform for exploring Egypt, connecting tourists with tour guides, destinations, and local services.

## Project Overview

Pharoahs-Way is a web application built with Node.js, Express, and Prisma, designed to facilitate tourism experiences in Egypt. The platform connects tourists with local tour guides, provides information about destinations, and helps manage various tourism-related services.

## Presentation

[View presentation slides on Google Drive](https://drive.google.com/drive/folders/1i7Z1dF9IyoLHFeOQo2hxXDFuJdtLzMhT)


## Features

- **Tourist Management**
  - Tourist registration and profile management
  - Unique email-based accounts
  - Secure password storage

- **Tour Guide System**
  - Professional tour guide profiles
  - Language and experience tracking
  - Destination-specific assignments
  - Profile picture support

- **Destination Management**
  - Comprehensive destination information
  - Associated attractions
  - Local restaurants
  - Hotel listings
  - Available activities

## Database Schema

The application uses PostgreSQL with Prisma as the ORM. Key models include:

### Core Models:
- **Destination**: Central model for managing tourist locations
- **Tourist**: User accounts for travelers
- **TourGuide**: Professional guide profiles
- **Attraction**: Points of interest at destinations
- **Restaurant**: Dining establishments
- **Hotel**: Accommodation options
- **Activity**: Available tourist activities
- **Review**: Analysis Tourist comment and rating

## Technical Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: RESTful architecture

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
