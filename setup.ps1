# Setup script for Drive Collective website

# Function to ensure directory exists
function Ensure-Directory {
    param([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force
        Write-Host "Created directory: $path"
    }
}

# Create necessary directories
$directories = @(
    "assets/images/sprites",
    "assets/audio",
    "assets/videos"
)

foreach ($dir in $directories) {
    Ensure-Directory $dir
}

# Create vehicle-icons.svg
$vehicleIconsSvg = @"
<svg xmlns="http://www.w3.org/2000/svg">
  <!-- MPG Icon -->
  <symbol id="icon-mpg" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
  </symbol>
  
  <!-- Doors Icon -->
  <symbol id="icon-doors" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm0-4H6v-2h6v2zm0-4H6V7h6v2zm7 8h-5v-2h5v2zm0-4h-5v-2h5v2zm0-4h-5V7h5v2z" fill="currentColor"/>
  </symbol>
  
  <!-- Seats Icon -->
  <symbol id="icon-seats" viewBox="0 0 24 24">
    <path d="M7 5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v10h2v-4h1c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-3c0-1.1.9-2 2-2h1v4h2V5z" fill="currentColor"/>
  </symbol>
  
  <!-- Fuel Type Icon -->
  <symbol id="icon-fueltype" viewBox="0 0 24 24">
    <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor"/>
  </symbol>

  <!-- Range Icon -->
  <symbol id="icon-range" viewBox="0 0 24 24">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="currentColor"/>
  </symbol>

  <!-- Rideshare Icon -->
  <symbol id="icon-rideshare" viewBox="0 0 24 24">
    <path d="M16 1a4 4 0 0 1 4 4v4h3l-5 7-5-7h3V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3h2v3c0 2.21-1.79 4-4 4H5c-2.21 0-4-1.79-4-4V5c0-2.21 1.79-4 4-4h11z" fill="currentColor"/>
  </symbol>
</svg>
"@

# Create contact-icons.svg
$contactIconsSvg = @"
<svg xmlns="http://www.w3.org/2000/svg">
  <!-- Phone Icon -->
  <symbol id="icon-phone" viewBox="0 0 24 24">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z" fill="currentColor"/>
  </symbol>

  <!-- Email Icon -->
  <symbol id="icon-email" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
  </symbol>

  <!-- Location Icon -->
  <symbol id="icon-location" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
  </symbol>
</svg>
"@

# Create feature-icons.svg
$featureIconsSvg = @"
<svg xmlns="http://www.w3.org/2000/svg">
  <!-- Car Icon -->
  <symbol id="icon-car" viewBox="0 0 24 24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z M7.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z M16.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="currentColor"/>
  </symbol>

  <!-- Support Icon -->
  <symbol id="icon-support" viewBox="0 0 24 24">
    <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7v6.1h1c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z" fill="currentColor"/>
    <path d="M9 16c0 1.66 1.34 3 3 3s3-1.34 3-3H9z" fill="currentColor"/>
  </symbol>

  <!-- Shield Icon -->
  <symbol id="icon-shield" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="currentColor"/>
  </symbol>
</svg>
"@

# Create social-icons.svg
$socialIconsSvg = @"
<svg xmlns="http://www.w3.org/2000/svg">
  <!-- Facebook Icon -->
  <symbol id="icon-facebook" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor"/>
  </symbol>
  
  <!-- Twitter Icon -->
  <symbol id="icon-twitter" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" fill="currentColor"/>
  </symbol>
  
  <!-- Instagram Icon -->
  <symbol id="icon-instagram" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
    <circle cx="12" cy="12" r="4" fill="none" stroke="white" stroke-width="2"/>
    <circle cx="18" cy="6" r="1.5" fill="white"/>
  </symbol>
</svg>
"@

# Write SVG files
$vehicleIconsSvg | Out-File -FilePath "assets/images/sprites/vehicle-icons.svg" -Encoding UTF8
$contactIconsSvg | Out-File -FilePath "assets/images/sprites/contact-icons.svg" -Encoding UTF8
$featureIconsSvg | Out-File -FilePath "assets/images/sprites/feature-icons.svg" -Encoding UTF8
$socialIconsSvg | Out-File -FilePath "assets/images/sprites/social-icons.svg" -Encoding UTF8

# Update home.html SVG sprites section
$svgSpritesHtml = @"
<!-- SVG Sprite Sheets -->
<div style="display: none;" aria-hidden="true">
    <!-- Include SVG sprite sheets inline -->
    $vehicleIconsSvg
    $contactIconsSvg
    $featureIconsSvg
    $socialIconsSvg
</div>
"@

# Read home.html content
$homeContent = Get-Content -Path "home.html" -Raw

# Replace old sprites section with new one
$homeContent = $homeContent -replace '<!-- SVG Sprite Sheets -->.*?</div>', $svgSpritesHtml

# Write updated home.html
$homeContent | Out-File -FilePath "home.html" -Encoding UTF8

Write-Host "Setup completed successfully!"
Write-Host "- SVG sprite files created in assets/images/sprites/"
Write-Host "- home.html updated with inline SVG sprites"
"@