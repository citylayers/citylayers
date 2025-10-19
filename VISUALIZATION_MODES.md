# Visualization Modes

CityLayers provides three different visualization modes to explore urban data on the map. Each mode offers different ways to interact with and filter the data.

---

## 🌡️ Gradient (Heatmap)

**Description:** Displays data as a continuous heatmap with color gradients showing data density and intensity.

**Use Cases:**
- Visualizing overall patterns and hot spots
- Understanding data distribution across the city
- Identifying areas with high concentration of observations

**Available Controls:**

### 1. Gradient Bar
- Visual representation of the color gradient from low to high intensity
- Shows the color scale used in the heatmap
- Helps interpret the data density on the map

### 2. Category Toggle
- Enable/disable specific data categories
- Filter which categories appear in the heatmap
- Combine multiple categories to see overlapping patterns

### 3. Double Slider (Range Filter)
- Set minimum and maximum value ranges for the displayed data
- Filter observations based on numeric attributes (e.g., year, intensity)
- Dynamically adjust the range to focus on specific subsets

**Visual Characteristics:**
- Smooth color transitions
- Blur radius: 30 pixels
- Point radius: 25 pixels
- Multiple colors blend together in areas with overlapping categories

---

## 🎯 Highlight

**Description:** Displays data points with solid, single-color overlays for each category, making individual categories stand out distinctly.

**Use Cases:**
- Comparing specific categories side-by-side
- Highlighting individual data categories clearly
- Creating custom color schemes for presentations

**Available Controls:**

### 1. Category Toggle
- Enable/disable specific data categories
- Each category uses a distinct solid color
- Toggle multiple categories to compare their spatial distribution

### 2. Color Picker
- Customize the color for each category
- Choose colors that match your presentation or branding
- Create high-contrast combinations for better visibility

### 3. Double Slider (Range Filter)
- Set minimum and maximum value ranges
- Filter observations by numeric attributes
- Narrow down the data to specific time periods or value ranges

**Visual Characteristics:**
- Solid, opaque colors for each category
- Blur radius: 5 pixels (sharper edges than gradient mode)
- Point radius: 25 pixels
- Full opacity (100%) for clear visibility
- Each category layer named as `flat_{category_id}`

---

## 📍 Elements

**Description:** Displays individual data points as discrete map elements (markers, icons, or shapes), allowing for precise point-by-point exploration.

**Use Cases:**
- Viewing individual observations in detail
- Clicking on specific points for more information
- Precise spatial analysis at the element level

**Available Controls:**

### 1. Category Toggle
- Enable/disable specific data categories
- Show/hide individual element types
- Focus on particular categories of interest

### 2. Double Slider (Range Filter)
- Set minimum and maximum value ranges
- Filter which elements are displayed based on attributes
- Zoom in on specific date ranges or value thresholds

### 3. Tags (Category Filters)
- Additional filtering by tags or subcategories
- Multi-select tag options to combine filters
- Refine the displayed elements based on multiple criteria

**Visual Characteristics:**
- Discrete, individual markers or icons
- No blur or density aggregation
- Each observation rendered separately
- Allows for click interactions on individual elements
- Named as "elements" in the layer system

---

## Switching Between Modes

Visualization modes can be switched using the visualization choice controls in the dashboard. Each mode:
- Preserves your category selections
- Maintains your filter settings (sliders, tags)
- Redraws the map layers with the new visualization style

**Technical Implementation:**
- Mode constants defined in `VIS` object: `GRADIENT` ("heatmap"), `HIGHLIGHT` ("highlight"), `ELEMENTS` ("elements")
- Each mode has specific heatmap style settings in `HeatmapStyle` class
- Controllers are configured differently based on the active visualization mode

---

## Control Availability Matrix

| Control Type | Gradient | Highlight | Elements |
|--------------|----------|-----------|----------|
| Gradient Bar | ✅ | ❌ | ❌ |
| Category Toggle | ✅ | ✅ | ✅ |
| Color Picker | ❌ | ✅ | ❌ |
| Double Slider | ✅ | ✅ | ✅ |
| Tags Filter | ❌ | ❌ | ✅ |

---

## Code References

**Visualization Constants:** [vischoiceContainer.js](public/js/ui/panelcomponent/vischoiceContainer.js#L1-5)

**Heatmap Styles:** [karta.js](public/js/karta/karta.js#L237-271)
- `HeatmapStyle.makeClassic()` - Gradient mode settings
- `HeatmapStyle.makeFlat()` - Highlight mode settings
- `HeatmapStyle.makeElements()` - Elements mode settings

**Layer Initialization:** [karta.js](public/js/karta/karta.js#L158-193)
- `LayerInitializer.heat()` - Gradient heatmap layers
- `LayerInitializer.flat()` - Highlight overlay layers
- `LayerInitializer.make()` - Main layer builder

**Control Configuration:** [categoryController.js](public/js/ui/panelcomponent/categoryController.js)
- Manages which controls are active for each visualization mode
