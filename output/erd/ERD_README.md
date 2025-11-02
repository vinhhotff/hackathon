# ERD Diagram - How to Generate PNG

## Option 1: Using Mermaid CLI

```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Convert to PNG
mmdc -i ERD.mmd -o ERD.png -w 2400 -H 1800
```

## Option 2: Using Online Editor

1. Visit https://mermaid.live/
2. Open `ERD.mmd` file
3. Copy contents into editor
4. Click "Actions" → "Download PNG"

## Option 3: VS Code Extension

1. Install "Markdown Preview Mermaid Support" extension
2. Open `ERD.mmd` in VS Code
3. Right-click → "Export as PNG"

## Diagram Contains:

- 10 Entities: Employee, Department, Passenger, Flight, Ticket, Transaction, Airport, Airplane, Crew, Shift
- 14 Relationships with foreign keys
- Primary keys and indexes
- Field types and constraints

