
# Node.js Project

## Description
This project is a Node.js application that provides a set of APIs to classify numbers based on their multiples and allows users to save and retrieve collections of these numbers.

## Installation

To get started with this project, you need to have Node.js and npm (Node Package Manager) installed on your system. If you don't have them installed, download and install them from [Node.js official website](https://nodejs.org/).

1. **Clone the Repository**

    ```bash
    git clone [your-repository-url]
    cd [your-project-directory]
    ```

2. **Install Dependencies**

    Run the following command to install the project dependencies:

    ```bash
    npm install
    ```

## Compilation

This project uses TypeScript. To compile the TypeScript code to JavaScript, run:

```bash
npm run tsc
```

## Running the Project

After compiling the TypeScript code, start the server using:

```bash
npm start
```

This will start the server on `http://localhost:4000/`.

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

## API Endpoints

- **Types:**
  - Type 1: Multiple of 3
  - Type 2: Multiple of 5
  - Type 3: Multiple of both 3 and 5
  - If not a multiple of 3 or 5, the number is printed

### 1. Get Multiples List

- **Endpoint:** `GET /multiples/100list`
- **Description:** Provides a list of numbers from 1-100 and their corresponding type.

### 2. Get Multiple Type of a Number

- **Endpoint:** `GET /multiples/:number`
- **Description:** Provides the corresponding type of the number.

### 3. Save Number to Collection

- **Endpoint:** `POST /collections/saveNumber`
- **Body:**
  ```json
  {
      "collectionName": "FirstCollection",
      "number": 15
  }
  ```
- **Description:** Saves a number to a specified collection.

### 4. List All Collections

- **Endpoint:** `GET /collections/listAll`
- **Description:** Returns a list of all collections saved in the system.
- **Return:** 
```json
  {
      "collections": {
          "FirstCollection": [
            { "value": 15, "type": "Type 3" },
          ],
        }
  }
  ```

### 5. Get Numbers in a Collection

- **Endpoint:** `GET /list/:collectionName`
- **Description:** Returns the collection with all the numbers and their types saved in that collection.
- **Return:** 
```json
  {
      "collection": [
        {
            "value": 15,
            "type": "Type 3"
        }
    ]
  }
  ```

## Contributing

Contributions to this project are welcome. Please ensure to follow the code of conduct and coding standards of the project.
