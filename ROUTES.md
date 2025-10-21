# 🗺️ CityLayers API Routes

Base URL: `http://localhost:3000`

## 📄 Static Pages (HTML)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Landing page with all projects |
| GET | `/team` | Team members page |
| GET | `/accessibility` | Accessibility statement |
| GET | `/privacy` | Privacy policy |
| GET | `/impressum` | Impressum (legal) |
| GET | `/success` | Submission success page |
| GET | `/sunburst` | Sunburst visualization |
| GET | `/robots.txt` | Robots.txt file |

**Try these:**
```bash
# Landing page (main page)
http://localhost:3000/

# Team page
http://localhost:3000/team

# Privacy page
http://localhost:3000/privacy
```

## 🏗️ Project Routes

### HTML Pages
| Method | Route | Description | Example |
|--------|-------|-------------|---------|
| GET | `/project/:project` | Project detail page | `/project/MyProject` |

**Try this:**
```bash
# Replace "MyProject" with an actual project name from your database
http://localhost:3000/project/MyProject
```

### API Endpoints
| Method | Route | Description | Example |
|--------|-------|-------------|---------|
| GET | `/getprojects` | Get all projects (JSON) | `/getprojects` |
| GET | `/project/team/:project` | Get project team (JSON) | `/project/team/MyProject` |
| GET | `/project/illustrations/:project` | Get project images (JSON) | `/project/illustrations/MyProject` |
| GET | `/project/partners/:project` | Get project partners (JSON) | `/project/partners/MyProject` |
| GET | `/project/recognitions/:project` | Get project awards (JSON) | `/project/recognitions/MyProject` |
| GET | `/project/projectinfo/:project` | Get project info (JSON) | `/project/projectinfo/MyProject` |

**Try these API endpoints:**
```bash
# Get all projects
http://localhost:3000/getprojects

# Get specific project data (replace MyProject with actual name)
http://localhost:3000/project/team/MyProject
http://localhost:3000/project/illustrations/MyProject
```

## 📍 Map & Pin Routes

| Method | Route | Description | Example |
|--------|-------|-------------|---------|
| GET | `/pin/:project` | Add pin page | `/pin/MyProject` |
| GET | `/map/:project` | Map view page | `/map/MyProject` |

**Try this:**
```bash
http://localhost:3000/map/MyProject
```

## 📤 Data Submission

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/submit` | Submit observation data |
| POST | `/upload` | Upload files |

**Test with curl:**
```bash
# Submit data
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{"data": "test"}'

# Upload file
curl -X POST http://localhost:3000/upload \
  -F "file=@/path/to/file.jpg"
```

## 🔍 Quick Test Commands

```bash
# 1. Check if server is running
curl http://localhost:3000/

# 2. Get all projects (API)
curl http://localhost:3000/getprojects

# 3. Get robots.txt
curl http://localhost:3000/robots.txt

# 4. Open in browser
open http://localhost:3000/
```

## 📝 Notes

- **Project names with spaces**: URLs automatically encode spaces as `%20`
  - Example: "My Project" → `/project/My%20Project`
- **404 Errors**: If you get "Failed to lookup view" errors, check:
  1. EJS templates exist in `public/html/`
  2. Database has projects to display
  3. Path configuration is correct (run with debug logs)

## 🎯 First Routes to Test

Start with these simple routes to verify everything works:

1. **Landing page**: http://localhost:3000/
2. **Get projects API**: http://localhost:3000/getprojects
3. **Robots.txt**: http://localhost:3000/robots.txt
4. **Team page**: http://localhost:3000/team
5. **Privacy page**: http://localhost:3000/privacy
