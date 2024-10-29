// sim.js - Simulations for Electrical Engineering E-learning Platform

// Utility functions
function createCanvas(id, width, height) {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

function drawCircle(ctx, x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawLine(ctx, x1, y1, x2, y2, color, width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

function drawText(ctx, text, x, y, font = '14px Arial', color = 'black', align = 'left') {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
}

// Unit 1: Health, Safety and Environment
function safetyGearSimulation() {
    const canvas = createCanvas('safetyGearCanvas', 600, 400);
    const ctx = canvas.getContext('2d');
    
    const gearItems = ['Insulated gloves', 'Safety glasses', 'Hard hat', 'Steel-toed boots', 'Arc flash suit'];
    const scenarios = [
        'Working on a live low-voltage circuit',
        'Inspecting a high-voltage transformer',
        'Installing overhead power lines'
    ];
    
    let currentScenario = 0;
    let selectedGear = [];
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw worker
        drawCircle(ctx, 300, 200, 50, '#FFD700');
        drawRect(ctx, 275, 250, 50, 100, '#4169E1');
        
        // Draw gear items
        gearItems.forEach((item, index) => {
            drawRect(ctx, 10, 10 + index * 30, 150, 25, selectedGear.includes(item) ? '#90EE90' : '#D3D3D3');
            drawText(ctx, item, 15, 28 + index * 30);
        });
        
        // Draw scenario
        drawText(ctx, scenarios[currentScenario], 10, 380, '16px Arial', 'black', 'left');
        
        // Draw submit button
        drawRect(ctx, 500, 350, 80, 30, '#4CAF50');
        drawText(ctx, 'Submit', 540, 370, '14px Arial', 'white', 'center');
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if gear item clicked
        gearItems.forEach((item, index) => {
            if (x >= 10 && x <= 160 && y >= 10 + index * 30 && y <= 35 + index * 30) {
                const itemIndex = selectedGear.indexOf(item);
                if (itemIndex === -1) {
                    selectedGear.push(item);
                } else {
                    selectedGear.splice(itemIndex, 1);
                }
            }
        });
        
        // Check if submit button clicked
        if (x >= 500 && x <= 580 && y >= 350 && y <= 380) {
            // Check if correct gear is selected for the scenario
            let correct = false;
            switch (currentScenario) {
                case 0: // Low-voltage circuit
                    correct = selectedGear.includes('Insulated gloves') && selectedGear.includes('Safety glasses');
                    break;
                case 1: // High-voltage transformer
                    correct = selectedGear.includes('Insulated gloves') && selectedGear.includes('Safety glasses') && selectedGear.includes('Hard hat') && selectedGear.includes('Arc flash suit');
                    break;
                case 2: // Overhead power lines
                    correct = selectedGear.includes('Insulated gloves') && selectedGear.includes('Safety glasses') && selectedGear.includes('Hard hat') && selectedGear.includes('Steel-toed boots');
                    break;
            }
            
            alert(correct ? 'Correct gear selected!' : 'Incorrect gear selection. Try again.');
            
            if (correct) {
                currentScenario = (currentScenario + 1) % scenarios.length;
                selectedGear = [];
            }
        }
        
        drawScene();
    });
    
    drawScene();
    return canvas;
}

// Unit 2: Basic Electrical Principles
function ohmsLawSimulation() {
    const canvas = createCanvas('ohmsLawCanvas', 600, 400);
    const ctx = canvas.getContext('2d');
    
    let voltage = 12;
    let current = 2;
    let resistance = voltage / current;
    
    function drawCircuit() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw battery
        drawRect(ctx, 50, 150, 30, 100, '#000');
        drawLine(ctx, 65, 130, 65, 150, '#000');
        drawLine(ctx, 55, 140, 75, 140, '#000');
        
        // Draw resistor
        drawLine(ctx, 80, 200, 520, 200, '#000');
        for (let i = 0; i < 10; i++) {
            drawLine(ctx, 120 + i * 40, 180, 140 + i * 40, 220, '#000');
        }
        
        // Draw ammeter
        drawCircle(ctx, 300, 300, 30, '#FFF');
        drawCircle(ctx, 300, 300, 28, '#F0F0F0');
        drawText(ctx, 'A', 300, 305, '16px Arial', '#000', 'center');
        drawLine(ctx, 300, 270, 300, 200, '#000');
        
        // Draw voltmeter
        drawCircle(ctx, 500, 100, 30, '#FFF');
        drawCircle(ctx, 500, 100, 28, '#F0F0F0');
        drawText(ctx, 'V', 500, 105, '16px Arial', '#000', 'center');
        drawLine(ctx, 500, 130, 500, 200, '#000');
        drawLine(ctx, 65, 150, 65, 200, '#000');
        drawLine(ctx, 65, 250, 65, 300, '#000');
        drawLine(ctx, 65, 300, 535, 300, '#000');
        drawLine(ctx, 535, 300, 535, 200, '#000');
        
        // Draw values
        drawText(ctx, `Voltage: ${voltage.toFixed(2)}V`, 20, 30);
        drawText(ctx, `Current: ${current.toFixed(2)}A`, 20, 50);
        drawText(ctx, `Resistance: ${resistance.toFixed(2)}Ω`, 20, 70);
    }
    
    function updateValues() {
        resistance = voltage / current;
        drawCircuit();
    }
    
    // Add voltage control
    const voltageSlider = document.createElement('input');
    voltageSlider.type = 'range';
    voltageSlider.min = '1';
    voltageSlider.max = '24';
    voltageSlider.value = voltage;
    voltageSlider.addEventListener('input', (e) => {
        voltage = parseFloat(e.target.value);
        updateValues();
    });
    
    // Add current control
    const currentSlider = document.createElement('input');
    currentSlider.type = 'range';
    currentSlider.min = '0.1';
    currentSlider.max = '5';
    currentSlider.step = '0.1';
    currentSlider.value = current;
    currentSlider.addEventListener('input', (e) => {
        current = parseFloat(e.target.value);
        updateValues();
    });
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('Voltage: '));
    container.appendChild(voltageSlider);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('Current: '));
    container.appendChild(currentSlider);
    
    drawCircuit();
    return container;
}

// Unit 3: Basic Electronics
function transistorSimulation() {
    const canvas = createCanvas('transistorCanvas', 600, 400);
    const ctx = canvas.getContext('2d');
    
    let baseVoltage = 0.7;
    let collectorVoltage = 5;
    
    function drawTransistor() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw transistor symbol
        drawLine(ctx, 300, 100, 300, 300, '#000');
        drawLine(ctx, 300, 200, 400, 100, '#000');
        drawLine(ctx, 300, 200, 400, 300, '#000');
        drawLine(ctx, 400, 100, 400, 300, '#000');
        drawLine(ctx, 300, 200, 200, 200, '#000');
        
        // Draw labels
        drawText(ctx, 'Collector', 410, 110);
        drawText(ctx, 'Base', 180, 205);
        drawText(ctx, 'Emitter', 410, 290);
        
        // Draw voltages
        drawText(ctx, `Base Voltage: ${baseVoltage.toFixed(2)}V`, 20, 30);
        drawText(ctx, `Collector Voltage: ${collectorVoltage.toFixed(2)}V`, 20, 50);
        
        // Draw current flow
        if (baseVoltage >= 0.7) {
            const alpha = (baseVoltage - 0.7) / 0.3; // 0 to 1
            drawLine(ctx, 200, 200, 300, 200, `rgba(255, 0, 0, ${alpha}`, 3);
            drawLine(ctx, 300, 200, 400, 300, `rgba(255, 0, 0, ${alpha * 0.8}`, 3);
        }
    }
    
    function updateValues() {
        drawTransistor();
    }
    
    // Add base voltage control
    const baseSlider = document.createElement('input');
    baseSlider.type = 'range';
    baseSlider.min = '0';
    baseSlider.max = '1';
    baseSlider.step = '0.1';
    baseSlider.value = baseVoltage;
    baseSlider.addEventListener('input', (e) => {
        baseVoltage = parseFloat(e.target.value);
        updateValues();
    });
    
    // Add collector voltage control
    const collectorSlider = document.createElement('input');
    collectorSlider.type = 'range';
    collectorSlider.min = '0';
    collectorSlider.max = '10';
    collectorSlider.step = '0.5';
    collectorSlider.value = collectorVoltage;
    collectorSlider.addEventListener('input', (e) => {
        collectorVoltage = parseFloat(e.target.value);
        updateValues();
    });
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('Base Voltage: '));
    container.appendChild(baseSlider);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('Collector Voltage: '));
    container.appendChild(collectorSlider);
    
    drawTransistor();
    return container;
}

// Unit 4: Sources of Electrical Energy
function energySourceSimulation() {
    const canvas = createCanvas('energySourceCanvas', 600, 400);
    const ctx = canvas.getContext('2d');
    
    const sources = ['Solar', 'Wind', 'Hydro', 'Nuclear', 'Coal'];
    let currentSource = 0;
    let power = 50;
    
    function drawEnergySource() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw power plant
        drawRect(ctx, 200, 150, 200, 150, '#808080');
        drawRect(ctx, 250, 100, 30, 50, '#A0522D');
        
        // Draw power lines
        drawLine(ctx, 400, 225, 550, 225, '#000');
        drawLine(ctx, 400, 225, 550, 175, '#000');
        drawLine(ctx, 400, 225, 550, 275, '#000');
        
        // Draw source-specific elements
        switch(sources[currentSource]) {
            case 'Solar':
                drawCircle(ctx, 100, 100, 50, '#FFD700');
                for (let i = 0; i < 8; i++) {
                    const angle = i * Math.PI / 4;
                    drawLine(ctx, 100, 100, 100 + Math.cos(angle) * 70, 100 + Math.sin(angle) * 70, '#FFD700');
                }
                break;
            case 'Wind':
                drawCircle(ctx, 100, 100, 10, '#000');
                for (let i = 0; i < 3; i++) {
                    const angle = i * 2 * Math.PI / 3 + Date.now() / 1000;
                    drawLine(ctx, 100, 100, 100 + Math.cos(angle) * 80, 100 + Math.sin(angle) * 80, '#4169E1');
                }
                break;
            case 'Hydro':
                drawRect(ctx, 50, 150, 100, 150, '#4169E1');
                drawRect(ctx, 150, 200, 50, 100, '#A0522D');
                break;
            case 'Nuclear':
                drawRect(ctx, 50, 150, 100, 150, '#A0522D');
                drawText(ctx, '☢', 100, 225, '72px Arial', '#FFD700', 'center');
                break;
            case 'Coal':
                drawRect(ctx, 50, 150, 100, 150, '#A0522D');
                drawCircle(ctx, 100, 100, 30, '#000');
                break;
        }
        
        // Draw labels
        
        drawText(ctx, `Source: ${sources[currentSource]}`, 20, 30);
        drawText(ctx, `Power Output: ${power}MW`, 20, 50);
    }
    
    function updateValues() {
        drawEnergySource();
    }
    
    // Add source selection
    const sourceSelect = document.createElement('select');
    sources.forEach((source, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = source;
        sourceSelect.appendChild(option);
    });
    sourceSelect.addEventListener('change', (e) => {
        currentSource = parseInt(e.target.value);
        updateValues();
    });
    
    // Add power output control
    const powerSlider = document.createElement('input');
    powerSlider.type = 'range';
    powerSlider.min = '0';
    powerSlider.max = '100';
    powerSlider.value = power;
    powerSlider.addEventListener('input', (e) => {
        power = parseInt(e.target.value);
        updateValues();
    });
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('Energy Source: '));
    container.appendChild(sourceSelect);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('Power Output: '));
    container.appendChild(powerSlider);
    
    drawEnergySource();
    return container;
}

// Unit 5: Electrical Tools and Equipment
function toolIdentificationSimulation() {
    const canvas = createCanvas('toolIdentificationCanvas', 600, 400);
    const ctx = canvas.getContext('2d');
    
    const tools = [
        { name: 'Multimeter', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Wire stripper', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Voltage tester', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Insulated screwdriver', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Clamp meter', image: '/placeholder.svg?height=100&width=100' }
    ];
    
    const scenarios = [
        'Measuring resistance in a circuit',
        'Removing insulation from a wire',
        'Checking if a circuit is live',
        'Tightening a terminal screw',
        'Measuring current in a thick cable'
    ];
    
    let currentScenario = 0;
    let selectedTool = null;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw tools
        tools.forEach((tool, index) => {
            const x = 50 + (index % 3) * 200;
            const y = 50 + Math.floor(index / 3) * 150;
            
            const img = new Image();
            img.src = tool.image;
            img.onload = () => {
                ctx.drawImage(img, x, y, 100, 100);
                drawText(ctx, tool.name, x + 50, y + 120, '14px Arial', '#000', 'center');
            };
            
            if (selectedTool === index) {
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 3;
                ctx.strokeRect(x - 5, y - 5, 110, 110);
            }
        });
        
        // Draw scenario
        drawRect(ctx, 0, 350, canvas.width, 50, '#F0F0F0');
        drawText(ctx, scenarios[currentScenario], 300, 375, '16px Arial', '#000', 'center');
        
        // Draw submit button
        drawRect(ctx, 500, 300, 80, 30, '#4CAF50');
        drawText(ctx, 'Submit', 540, 320, '14px Arial', 'white', 'center');
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if tool clicked
        tools.forEach((tool, index) => {
            const toolX = 50 + (index % 3) * 200;
            const toolY = 50 + Math.floor(index / 3) * 150;
            if (x >= toolX && x <= toolX + 100 && y >= toolY && y <= toolY + 100) {
                selectedTool = index;
            }
        });
        
        // Check if submit button clicked
        if (x >= 500 && x <= 580 && y >= 300 && y <= 330) {
            if (selectedTool !== null) {
                const correct = selectedTool === currentScenario;
                alert(correct ? 'Correct tool selected!' : 'Incorrect tool selection. Try again.');
                if (correct) {
                    currentScenario = (currentScenario + 1) % scenarios.length;
                    selectedTool = null;
                }
            } else {
                alert('Please select a tool before submitting.');
            }
        }
        
        drawScene();
    });
    
    drawScene();
    return canvas;
}

// Unit 6: Electrical Wiring Standards
function wiringDiagramSimulation() {
    const canvas = createCanvas('wiringDiagramCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Outlet', symbol: '⏚' },
        { name: 'Light switch', symbol: '⋈' },
        { name: 'Ceiling light', symbol: '◯' },
        { name: 'GFCI outlet', symbol: '⏚⏚' },
        { name: 'Circuit breaker', symbol: '—/—' }
    ];
    
    const rooms = [
        { name: 'Bedroom', outlets: 4, lights: 1, switches: 1 },
        { name: 'Kitchen', outlets: 6, lights: 2, switches: 2, gfci: 2 },
        { name: 'Bathroom', outlets: 2, lights: 1, switches: 1, gfci: 1 },
        { name: 'Living room', outlets: 6, lights: 2, switches: 2 }
    ];
    
    let currentRoom = 0;
    let placedComponents = [];
    
    function drawRoom() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw room outline
        drawRect(ctx, 50, 50, 700, 400, '#000');
        drawRect(ctx, 52, 52, 696, 396, '#FFF');
        
        // Draw placed components
        placedComponents.forEach(comp => {
            drawText(ctx, comp.symbol, comp.x, comp.y, '24px Arial', '#000', 'center');
        });
        
        // Draw component palette
        components.forEach((comp, index) => {
            drawRect(ctx, 50 + index * 150, 500, 140, 60, '#F0F0F0');
            drawText(ctx, comp.symbol, 70 + index * 150, 535, '24px Arial', '#000', 'center');
            drawText(ctx, comp.name, 120 + index * 150, 545, '12px Arial', '#000', 'center');
        });
        
        // Draw room info
        const room = rooms[currentRoom];
        drawText(ctx, `Room: ${room.name}`, 50, 30, '16px Arial', '#000', 'left');
        drawText(ctx, `Outlets: ${placedComponents.filter(c => c.name === 'Outlet').length}/${room.outlets}`, 200, 30, '14px Arial', '#000', 'left');
        drawText(ctx, `Lights: ${placedComponents.filter(c => c.name === 'Ceiling light').length}/${room.lights}`, 350, 30, '14px Arial', '#000', 'left');
        drawText(ctx, `Switches: ${placedComponents.filter(c => c.name === 'Light switch').length}/${room.switches}`, 500, 30, '14px Arial', '#000', 'left');
        if (room.gfci) {
            drawText(ctx, `GFCI: ${placedComponents.filter(c => c.name === 'GFCI outlet').length}/${room.gfci}`, 650, 30, '14px Arial', '#000', 'left');
        }
    }
    
    let selectedComponent = null;
    
    canvas.addEventListener('mousedown', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if component in palette clicked
        components.forEach((comp, index) => {
            if (x >= 50 + index * 150 && x <= 190 + index * 150 && y >= 500 && y <= 560) {
                selectedComponent = comp;
            }
        });
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (selectedComponent) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            drawRoom();
            drawText(ctx, selectedComponent.symbol, x, y, '24px Arial', 'rgba(0,0,0,0.5)', 'center');
        }
    });
    
    canvas.addEventListener('mouseup', (event) => {
        if (selectedComponent) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            if (x >= 50 && x <= 750 && y >= 50 && y <= 450) {
                placedComponents.push({ ...selectedComponent, x, y });
            }
            
            selectedComponent = null;
            drawRoom();
        }
    });
    
    // Add room selection
    const roomSelect = document.createElement('select');
    rooms.forEach((room, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = room.name;
        roomSelect.appendChild(option);
    });
    roomSelect.addEventListener('change', (e) => {
        currentRoom = parseInt(e.target.value);
        placedComponents = [];
        drawRoom();
    });
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode('Select Room: '));
    container.appendChild(roomSelect);
    
    drawRoom();
    return container;
}

// Unit 7: Multimeter
function multimeterSimulation() {
    const canvas = createCanvas('multimeterCanvas', 600, 400);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Resistor', value: 1000, unit: 'Ω' },
        { name: 'Battery', value: 9, unit: 'V' },
        { name: 'Capacitor', value: 100, unit: 'µF' },
        { name: 'LED', value: 2, unit: 'V' }
    ];
    
    let selectedComponent = null;
    let multimeterMode = 'voltage';
    let probePosition = { x: 300, y: 200 };
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw multimeter
        drawRect(ctx, 400, 50, 150, 200, '#808080');
        drawRect(ctx, 410, 60, 130, 80, '#000');
        drawText(ctx, multimeterMode.toUpperCase(), 475, 100, '16px Arial', '#0F0', 'center');
        
        let displayValue = '0.00';
        if (selectedComponent) {
            if (multimeterMode === 'voltage' && selectedComponent.unit === 'V') {
                displayValue = selectedComponent.value.toFixed(2);
            } else if (multimeterMode === 'resistance' && selectedComponent.unit === 'Ω') {
                displayValue = selectedComponent.value.toFixed(2);
            } else if (multimeterMode === 'capacitance' && selectedComponent.unit === 'µF') {
                displayValue = selectedComponent.value.toFixed(2);
            }
        }
        drawText(ctx, displayValue, 475, 130, '24px Arial', '#0F0', 'center');
        
        // Draw mode selection buttons
        const modes = ['voltage', 'resistance', 'capacitance'];
        modes.forEach((mode, index) => {
            drawRect(ctx, 410 + index * 50, 150, 40, 30, mode === multimeterMode ? '#4CAF50' : '#ddd');
            drawText(ctx, mode[0].toUpperCase(), 430 + index * 50, 170, '16px Arial', '#000', 'center');
        });
        
        // Draw components
        components.forEach((comp, index) => {
            const x = 50 + (index % 2) * 150;
            const y = 50 + Math.floor(index / 2) * 100;
            drawRect(ctx, x, y, 100, 80, '#F0F0F0');
            drawText(ctx, comp.name, x + 50, y + 30, '16px Arial', '#000', 'center');
            drawText(ctx, `${comp.value} ${comp.unit}`, x + 50, y + 60, '14px Arial', '#000', 'center');
        });
        
        // Draw probes
        drawLine(ctx, 475, 250, probePosition.x, probePosition.y, '#F00', 2);
        drawLine(ctx, 525, 250, probePosition.x + 20, probePosition.y, '#000', 2);
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if mode button clicked
        const modes = ['voltage', 'resistance', 'capacitance'];
        modes.forEach((mode, index) => {
            if (x >= 410 + index * 50 && x <= 450 + index * 50 && y >= 150 && y <= 180) {
                multimeterMode = mode;
            }
        });
        
        // Check if component clicked
        components.forEach((comp, index) => {
            const compX = 50 + (index % 2) * 150;
            const compY = 50 + Math.floor(index / 2) * 100;
            if (x >= compX && x <= compX + 100 && y >= compY && y <= compY + 80) {
                selectedComponent = comp;
                probePosition = { x: compX + 50, y: compY + 40 };
            }
        });
        
        drawScene();
    });
    
    drawScene();
    return canvas;
}

// Unit 8: Insulation and Earth Resistance Testers
function resistanceTestingSimulation() {
    const canvas = createCanvas('resistanceTestingCanvas', 600, 400);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Cable', insulation: 100, earth: 0.5 },
        { name: 'Motor', insulation: 50, earth: 1.0 },
        { name: 'Transformer', insulation: 200, earth: 0.2 },
        { name: 'Circuit breaker', insulation: 150, earth: 0.3 }
    ];
    
    let selectedComponent = null;
    let testMode = 'insulation';
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw tester
        drawRect(ctx, 400, 50, 150, 200, '#808080');
        drawRect(ctx, 410, 60, 130, 80, '#000');
        drawText(ctx, testMode.toUpperCase(), 475, 100, '16px Arial', '#0F0', 'center');
        
        let displayValue = '---';
        if (selectedComponent) {
            if (testMode === 'insulation') {
                displayValue = selectedComponent.insulation.toFixed(1) + ' MΩ';
            } else if (testMode === 'earth') {
                displayValue = selectedComponent.earth.toFixed(2) + ' Ω';
            }
        }
        drawText(ctx, displayValue, 475, 130, '24px Arial', '#0F0', 'center');
        
        // Draw mode selection buttons
        const modes = ['insulation', 'earth'];
        modes.forEach((mode, index) => {
            drawRect(ctx, 410 + index * 75, 150, 70, 30, mode === testMode ? '#4CAF50' : '#ddd');
            drawText(ctx, mode, 445 + index * 75, 170, '14px Arial', '#000', 'center');
        });
        
        // Draw components
        components.forEach((comp, index) => {
            const x = 50 + (index % 2) * 150;
            const y = 50 + Math.floor(index / 2) * 100;
            drawRect(ctx, x, y, 100, 80, '#F0F0F0');
            drawText(ctx, comp.name, x + 50, y + 30, '16px Arial', '#000', 'center');
            drawText(ctx, 'Click to test', x + 50, y + 60, '14px Arial', '#000', 'center');
        });
        
        // Draw probes
        if (selectedComponent) {
            const index = components.indexOf(selectedComponent);
            const x = 50 + (index % 2) * 150;
            const y = 50 + Math.floor(index / 2) * 100;
            drawLine(ctx, 475, 250, x + 25, y + 40, '#F00', 2);
            drawLine(ctx, 525, 250, x + 75, y + 40, '#000', 2);
        }
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if mode button clicked
        const modes = ['insulation', 'earth'];
        modes.forEach((mode, index) => {
            if (x >= 410 + index * 75 && x <= 480 + index * 75 && y >= 150 && y <= 180) {
                testMode = mode;
            }
        });
        
        // Check if component clicked
        components.forEach((comp, index) => {
            const compX = 50 + (index % 2) * 150;
            const compY = 50 + Math.floor(index / 2) * 100;
            if (x >= compX && x <= compX + 100 && y >= compY && y <= compY + 80) {
                selectedComponent = comp;
            }
        });
        
        drawScene();
    });
    
    drawScene();
    return canvas;
}

// Unit 9: Electrical Machines
function electricalMachineSimulation() {
    const canvas = createCanvas('electricalMachineCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const machines = [
        { name: 'DC Motor', type: 'motor', speed: 1000, torque: 50 },
        { name: 'AC Generator', type: 'generator', voltage: 220, frequency: 50 },
        { name: 'Transformer', type: 'transformer', primaryVoltage: 220, secondaryVoltage: 110 },
        { name: 'Induction Motor', type: 'motor', speed: 1500, torque: 100 }
    ];
    
    let selectedMachine = machines[0];
    let running = false;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw machine selection
        machines.forEach((machine, index) => {
            drawRect(ctx, 50 + index * 200, 50, 180, 60, machine === selectedMachine ? '#4CAF50' : '#F0F0F0');
            drawText(ctx, machine.name, 140 + index * 200, 85, '16px Arial', '#000', 'center');
        });
        
        // Draw machine visualization
        drawRect(ctx, 200, 150, 400, 300, '#808080');
        drawCircle(ctx, 400, 300, 100, '#C0C0C0');
        
        if (running) {
            // Animate based on machine type
            const time = Date.now() / 1000;
            if (selectedMachine.type === 'motor' || selectedMachine.type === 'generator') {
                const rotationSpeed = selectedMachine.type === 'motor' ? selectedMachine.speed : selectedMachine.frequency * 60;
                const angle = (time * rotationSpeed / 60) % (2 * Math.PI);
                drawLine(ctx, 400, 300, 400 + Math.cos(angle) * 90, 300 + Math.sin(angle) * 90, '#000', 5);
            } else if (selectedMachine.type === 'transformer') {
                const primaryAmplitude = Math.sin(time * 2 * Math.PI * 50) * 50;
                const secondaryAmplitude = primaryAmplitude * (selectedMachine.secondaryVoltage / selectedMachine.primaryVoltage);
                drawLine(ctx, 300, 300 + primaryAmplitude, 350, 300 + primaryAmplitude, '#F00', 3);
                drawLine(ctx, 450, 300 + secondaryAmplitude, 500, 300 + secondaryAmplitude, '#00F', 3);
            }
        }
        
        // Draw machine parameters
        let paramText = '';
        if (selectedMachine.type === 'motor') {
            paramText = `Speed: ${selectedMachine.speed} RPM\nTorque: ${selectedMachine.torque} Nm`;
        } else if (selectedMachine.type === 'generator') {
            paramText = `Voltage: ${selectedMachine.voltage} V\nFrequency: ${selectedMachine.frequency} Hz`;
        } else if (selectedMachine.type === 'transformer') {
            paramText = `Primary: ${selectedMachine.primaryVoltage} V\nSecondary: ${selectedMachine.secondaryVoltage} V`;
        }
        drawText(ctx, paramText, 400, 500, '16px Arial', '#000', 'center');
        
        // Draw start/stop button
        drawRect(ctx, 350, 530, 100, 40, running ? '#FF0000' : '#4CAF50');
        drawText(ctx, running ? 'Stop' : 'Start', 400, 555, '16px Arial', '#FFF', 'center');
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if machine selected
        machines.forEach((machine, index) => {
            if (x >= 50 + index * 200 && x <= 230 + index * 200 && y >= 50 && y <= 110) {
                selectedMachine = machine;
                running = false;
            }
        });
        
        // Check if start/stop button clicked
        if (x >= 350 && x <= 450 && y >= 530 && y <= 570) {
            running = !running;
        }
        
        drawScene();
    });
    
    function animate() {
        drawScene();
        requestAnimationFrame(animate);
    }
    
    animate();
    return canvas;
}

// Unit 10: Electrical Circuits
function electricalCircuitSimulation() {
    const canvas = createCanvas('electricalCircuitCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Resistor', symbol: '⏛', value: 100, unit: 'Ω' },
        { name: 'Capacitor', symbol: '⏧', value: 100, unit: 'µF' },
        { name: 'Inductor', symbol: '⏝', value: 10, unit: 'mH' },
        { name: 'Voltage Source', symbol: '⎓', value: 12, unit: 'V' }
    ];
    
    let circuit = [];
    let selectedComponent = null;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw component palette
        components.forEach((comp, index) => {
            drawRect(ctx, 50 + index * 150, 50, 100, 80, '#F0F0F0');
            drawText(ctx, comp.symbol, 100 + index * 150, 90, '24px Arial', '#000', 'center');
            drawText(ctx, comp.name, 100 + index * 150, 120, '14px Arial', '#000', 'center');
        });
        
        // Draw circuit area
        drawRect(ctx, 50, 150, 700, 400, '#E0E0E0');
        
        // Draw placed components
        circuit.forEach((comp, index) => {
            drawText(ctx, comp.symbol, comp.x, comp.y, '24px Arial', '#000', 'center');
            drawText(ctx, `${comp.value} ${comp.unit}`, comp.x, comp.y + 30, '14px Arial', '#000', 'center');
            
            if (index > 0) {
                drawLine(ctx, circuit[index-1].x + 20, circuit[index-1].y, comp.x - 20, comp.y, '#000', 2);
            }
        });
        
        // Draw analysis button
        drawRect(ctx, 650, 50, 100, 40, '#4CAF50');
        drawText(ctx, 'Analyze', 700, 75, '16px Arial', '#FFF', 'center');
    }
    
    canvas.addEventListener('mousedown', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if component in palette clicked
        components.forEach((comp, index) => {
            if (x >= 50 + index * 150 && x <= 150 + index * 150 && y >= 50 && y <= 130) {
                selectedComponent = { ...comp };
            }
        });
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (selectedComponent) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            drawScene();
            drawText(ctx, selectedComponent.symbol, x, y, '24px Arial', 'rgba(0,0,0,0.5)', 'center');
        }
    });
    
    canvas.addEventListener('mouseup', (event) => {
        if (selectedComponent) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            if (x >= 50 && x <= 750 && y >= 150 && y <= 550) {
                circuit.push({ ...selectedComponent, x, y });
            }
            
            selectedComponent = null;
            drawScene();
        }
    });
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if analyze button clicked
        if (x >= 650 && x <= 750 && y >= 50 && y <= 90) {
            analyzeCircuit();
        }
    });
    
    function analyzeCircuit() {
        let analysis = 'Circuit Analysis:\n';
        let totalResistance = 0;
        let totalCapacitance = 0;
        let totalInductance = 0;
        let voltage = 0;
        
        circuit.forEach(comp => {
            if (comp.name === 'Resistor') totalResistance += comp.value;
            if (comp.name === 'Capacitor') totalCapacitance += comp.value;
            if (comp.name === 'Inductor') totalInductance += comp.value;
            if (comp.name === 'Voltage Source') voltage = comp.value;
        });
        
        analysis += `Total Resistance: ${totalResistance} Ω\n`;
        analysis += `Total Capacitance: ${totalCapacitance} µF\n`;
        analysis += `Total Inductance: ${totalInductance} mH\n`;
        analysis += `Applied Voltage: ${voltage} V\n`;
        
        if (voltage > 0 && totalResistance > 0) {
            const current = voltage / totalResistance;
            analysis += `Current: ${current.toFixed(2)} A\n`;
        }
        
        alert(analysis);
    }
    
    drawScene();
    return canvas;
}

// Unit 11: Electrical Installations
function electricalInstallationSimulation() {
    const canvas = createCanvas('electricalInstallationCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Main Switch', symbol: '⏻', x: 100, y: 100 },
        { name: 'Circuit Breaker', symbol: '—/—', x: 100, y: 200 },
        { name: 'RCD', symbol: 'RCD', x: 100, y: 300 },
        { name: 'Socket', symbol: '⏚', x: 300, y: 100 },
        { name: 'Light', symbol: '◯', x: 300, y: 200 },
        { name: 'Switch', symbol: '⋈', x: 300, y: 300 }
    ];
    
    let selectedComponent = null;
    let connections = [];
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw components
        components.forEach(comp => {
            drawCircle(ctx, comp.x, comp.y, 20, '#F0F0F0');
            drawText(ctx, comp.symbol, comp.x, comp.y, '16px Arial', '#000', 'center');
            drawText(ctx, comp.name, comp.x, comp.y + 30, '12px Arial', '#000', 'center');
        });
        
        // Draw connections
        connections.forEach(conn => {
            drawLine(ctx, conn.start.x, conn.start.y, conn.end.x, conn.end.y, '#000', 2);
        });
        
        // Draw instruction
        drawText(ctx, 'Click and drag to connect components', 400, 30, '16px Arial', '#000', 'center');
        
        // Draw verify button
        drawRect(ctx, 650, 50, 100, 40, '#4CAF50');
        drawText(ctx, 'Verify', 700, 75, '16px Arial', '#FFF', 'center');
    }
    
    canvas.addEventListener('mousedown', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        components.forEach(comp => {
            if (Math.sqrt((x - comp.x)**2 + (y - comp.y)**2) <= 20) {
                selectedComponent = comp;
            }
        });
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (selectedComponent) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            drawScene();
            drawLine(ctx, selectedComponent.x, selectedComponent.y, x, y, '#000', 2);
        }
    });
    
    canvas.addEventListener('mouseup', (event) => {
        if (selectedComponent) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            components.forEach(comp => {
                if (comp !== selectedComponent && Math.sqrt((x - comp.x)**2 + (y - comp.y)**2) <= 20) {
                    connections.push({ start: selectedComponent, end: comp });
                }
            });
            
            selectedComponent = null;
            drawScene();
        }
    });
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if verify button clicked
        if (x >= 650 && x <= 750 && y >= 50 && y <= 90) {
            verifyInstallation();
        }
    });
    
    function verifyInstallation() {
        let issues = [];
        
        // Check if main switch is connected to circuit breaker
        if (!connections.some(conn => 
            (conn.start.name === 'Main Switch' && conn.end.name === 'Circuit Breaker') ||
            (conn.start.name === 'Circuit Breaker' && conn.end.name === 'Main Switch')
        )) {
            issues.push('Main Switch is not connected to Circuit Breaker');
        }
        
        // Check if circuit breaker is connected to RCD
        if (!connections.some(conn => 
            (conn.start.name === 'Circuit Breaker' && conn.end.name === 'RCD') ||
            (conn.start.name === 'RCD' && conn.end.name === 'Circuit Breaker')
        )) {
            issues.push('Circuit Breaker is not connected to RCD');
        }
        
        // Check if RCD is connected to at least one socket or light
        if (!connections.some(conn => 
            (conn.start.name === 'RCD' && (conn.end.name === 'Socket' || conn.end.name === 'Light')) ||
            ((conn.start.name === 'Socket' || conn.start.name === 'Light') && conn.end.name === 'RCD')
        )) {
            issues.push('RCD is not connected to any Socket or Light');
        }
        
        // Check if switch is connected to a light
        if (!connections.some(conn => 
            (conn.start.name === 'Switch' && conn.end.name === 'Light') ||
            (conn.start.name === 'Light' && conn.end.name === 'Switch')
        )) {
            issues.push('Switch is not connected to a Light');
        }
        
        if (issues.length === 0) {
            alert('Installation verified successfully!');
        } else {
            alert('Installation issues found:\n' + issues.join('\n'));
        }
    }
    
    drawScene();
    return canvas;
}

// Unit 12: Electrical Maintenance
function electricalMaintenanceSimulation() {
    const canvas = createCanvas('electricalMaintenanceCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const equipment = [
        { name: 'Motor', health: 100, lastMaintenance: new Date(2023, 0, 1) },
        { name: 'Transformer', health: 100, lastMaintenance: new Date(2023, 0, 1) },
        { name: 'Circuit Breaker', health: 100, lastMaintenance: new Date(2023, 0, 1) },
        { name: 'Generator', health: 100, lastMaintenance: new Date(2023, 0, 1) }
    ];
    
    let currentDate = new Date(2023, 0, 1);
    let selectedEquipment = null;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw date
        drawText(ctx, `Current Date: ${currentDate.toDateString()}`, 400, 30, '16px Arial', '#000', 'center');
        
        // Draw equipment
        equipment.forEach((equip, index) => {
            const x = 100 + (index % 2) * 300;
            const y = 100 + Math.floor(index / 2) * 200;
            
            drawRect(ctx, x, y, 250, 150, equip === selectedEquipment ? '#E0E0E0' : '#F0F0F0');
            drawText(ctx, equip.name, x + 125, y + 30, '18px Arial', '#000', 'center');
            drawText(ctx, `Health: ${equip.health}%`, x + 125, y + 60, '16px Arial', '#000', 'center');
            drawText(ctx, `Last Maintenance: ${equip.lastMaintenance.toDateString()}`, x + 125, y + 90, '14px Arial', '#000', 'center');
            
            // Draw maintenance button
            drawRect(ctx, x + 75, y + 110, 100, 30, '#4CAF50');
            drawText(ctx, 'Maintain', x + 125, y + 130, '14px Arial', '#FFF', 'center');
        });
        
        // Draw advance time button
        drawRect(ctx, 650, 50, 120, 40, '#4CAF50');
        drawText(ctx, 'Advance 30 days', 710, 75, '14px Arial', '#FFF', 'center');
    }
    
    function advanceTime() {
        currentDate.setDate(currentDate.getDate() + 30);
        
        equipment.forEach(equip => {
            const daysSinceLastMaintenance = (currentDate - equip.lastMaintenance) / (1000 * 60 * 60 * 24);
            equip.health = Math.max(0, equip.health - daysSinceLastMaintenance / 30);
            
            if (equip.health < 50) {
                alert(`Warning: ${equip.name} health is low (${equip.health.toFixed(1)}%). Maintenance required.`);
            }
        });
        
        drawScene();
    }
    
    function maintainEquipment(equip) {
        equip.health = 100;
        equip.lastMaintenance = new Date(currentDate);
        alert(`${equip.name} has been maintained. Health restored to 100%.`);
        drawScene();
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Check if advance time button clicked
        if (x >= 650 && x <= 770 && y >= 50 && y <= 90) {
            advanceTime();
            return;
        }
        
        // Check if equipment or maintenance button clicked
        equipment.forEach((equip, index) => {
            const equipX = 100 + (index % 2) * 300;
            const equipY = 100 + Math.floor(index / 2) * 200;
            
            if (x >= equipX && x <= equipX + 250 && y >= equipY && y <= equipY + 150) {
                selectedEquipment = equip;
                
                // Check if maintenance button clicked
                if (x >= equipX + 75 && x <= equipX + 175 && y >= equipY + 110 && y <= equipY + 140) {
                    maintainEquipment(equip);
                }
            }
        });
        
        drawScene();
    });
    
    drawScene();
    return canvas;
}

// Unit 13: Electrical Fault Finding
function electricalFaultFindingSimulation() {
    const canvas = createCanvas('electricalFaultFindingCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Power Source', x: 100, y: 100, faulty: false },
        { name: 'Circuit Breaker', x: 250, y: 100, faulty: false },
        { name: 'Wire 1', x: 400, y: 100, faulty: false },
        { name: 'Junction Box', x: 550, y: 100, faulty: false },
        { name: 'Wire 2', x: 700, y: 100, faulty: false },
        { name: 'Wire 3', x: 550, y: 250, faulty: false },
        { name: 'Light Fixture', x: 700, y: 250, faulty: false }
    ];
    
    let selectedComponent = null;
    let faultyComponent = null;
    let gameStarted = false;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw components
        components.forEach(comp => {
            drawCircle(ctx, comp.x, comp.y, 30, selectedComponent === comp ? '#E0E0E0' : '#F0F0F0');
            drawText(ctx, comp.name, comp.x, comp.y + 50, '12px Arial', '#000', 'center');
        });
        
        // Draw connections
        drawLine(ctx, 130, 100, 220, 100, '#000', 2);
        drawLine(ctx, 280, 100, 370, 100, '#000', 2);
        drawLine(ctx, 430, 100, 520, 100, '#000', 2);
        drawLine(ctx, 580, 100, 670, 100, '#000', 2);
        drawLine(ctx, 730, 100, 730, 220, '#000', 2);
        drawLine(ctx, 550, 130, 550, 220, '#000', 2);
        drawLine(ctx, 580, 250, 670, 250, '#000', 2);
        
        if (gameStarted) {
            drawText(ctx, 'Click on components to test them', 400, 30, '16px Arial', '#000', 'center');
        } else {
            drawRect(ctx, 350, 500, 100, 40, '#4CAF50');
            drawText(ctx, 'Start Game', 400, 525, '16px Arial', '#FFF', 'center');
        }
    }
    
    function startGame() {
        gameStarted = true;
        faultyComponent = components[Math.floor(Math.random() * components.length)];
        faultyComponent.faulty = true;
        drawScene();
    }
    
    function testComponent(comp) {
        if (comp === faultyComponent) {
            alert(`Fault found in ${comp.name}! Game Over.`);
            resetGame();
        } else {
            alert(`${comp.name} is working correctly.`);
        }
    }
    
    function resetGame() {
        gameStarted = false;
        faultyComponent.faulty = false;
        faultyComponent = null;
        selectedComponent = null;
        drawScene();
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        if (!gameStarted) {
            if (x >= 350 && x <= 450 && y >= 500 && y <= 540) {
                startGame();
            }
            return;
        }
        
        components.forEach(comp => {
            if (Math.sqrt((x - comp.x)**2 + (y - comp.y)**2) <= 30) {
                selectedComponent = comp;
                testComponent(comp);
            }
        });
        
        drawScene();
    });
    
    drawScene();
    return canvas;
}

// Unit 14: Electrical Protection Systems
function electricalProtectionSimulation() {
    const canvas = createCanvas('electricalProtectionCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Generator', x: 100, y: 300, status: 'normal' },
        { name: 'Transformer', x: 300, y: 300, status: 'normal' },
        { name: 'Bus Bar', x: 500, y: 300, status: 'normal' },
        { name: 'Load', x: 700, y: 300, status: 'normal' }
    ];
    
    const protectionDevices = [
        { name: 'Generator Protection', x: 100, y: 200, triggered: false },
        { name: 'Transformer Protection', x: 300, y: 200, triggered: false },
        { name: 'Overcurrent Relay', x: 500, y: 200, triggered: false },
        { name: 'Circuit Breaker', x: 600, y: 300, triggered: false }
    ];
    
    let simulationRunning = false;
    let faultLocation = null;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw components
        components.forEach(comp => {
            drawRect(ctx, comp.x - 50, comp.y - 30, 100, 60, comp.status === 'normal' ? '#90EE90' : '#FF6347');
            drawText(ctx, comp.name, comp.x, comp.y + 50, '14px Arial', '#000', 'center');
        });
        
        // Draw connections
        drawLine(ctx, 150, 300, 250, 300, '#000', 2);
        drawLine(ctx, 350, 300, 450, 300, '#000', 2);
        drawLine(ctx, 550, 300, 650, 300, '#000', 2);
        
        // Draw protection devices
        protectionDevices.forEach(device => {
            drawCircle(ctx, device.x, device.y, 20, device.triggered ? '#FF6347' : '#F0F0F0');
            drawText(ctx, device.name, device.x, device.y - 30, '12px Arial', '#000', 'center');
        });
        
        // Draw circuit breaker
        drawRect(ctx, 590, 290, 20, 20, protectionDevices[3].triggered ? '#FF6347' : '#90EE90');
        
        if (!simulationRunning) {
            drawRect(ctx, 350, 500, 100, 40, '#4CAF50');
            drawText(ctx, 'Start Simulation', 400, 525, '14px Arial', '#FFF', 'center');
        } else {
            drawRect(ctx, 350, 500, 100, 40, '#FF6347');
            drawText(ctx, 'Stop Simulation', 400, 525, '14px Arial', '#FFF', 'center');
        }
    }
    
    function startSimulation() {
        simulationRunning = true;
        faultLocation = components[Math.floor(Math.random() * components.length)];
        faultLocation.status = 'fault';
        
        setTimeout(triggerProtection, 2000);
        drawScene();
    }
    
    function stopSimulation() {
        simulationRunning = false;
        components.forEach(comp => comp.status = 'normal');
        protectionDevices.forEach(device => device.triggered = false);
        faultLocation = null;
        drawScene();
    }
    
    function triggerProtection() {
        if (!simulationRunning) return;
        
        let deviceTriggered = false;
        
        switch (faultLocation.name) {
            case 'Generator':
                protectionDevices[0].triggered = true;
                deviceTriggered = true;
                break;
            case 'Transformer':
                protectionDevices[1].triggered = true;
                deviceTriggered = true;
                break;
            case 'Bus Bar':
            case 'Load':
                protectionDevices[2].triggered = true;
                deviceTriggered = true;
                break;
        }
        
        if (deviceTriggered) {
            protectionDevices[3].triggered = true;  // Trip circuit breaker
            alert(`Fault detected in ${faultLocation.name}. Protection system activated.`);
        }
        
        drawScene();
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        if (x >= 350 && x <= 450 && y >= 500 && y <= 540) {
            if (simulationRunning) {
                stopSimulation();
            } else {
                startSimulation();
            }
        }
    });
    
    drawScene();
    return canvas;
}

// Unit 15: Electrical Transformers
function transformerSimulation() {
    const canvas = createCanvas('transformerCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    let primaryVoltage = 230;
    let primaryTurns = 1000;
    let secondaryTurns = 100;
    let load = 10; // ohms
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw transformer
        drawRect(ctx, 300, 200, 200, 200, '#A0522D');
        
        // Draw primary winding
        for (let i = 0; i < 10; i++) {
            drawCircle(ctx, 320, 220 + i * 20, 10, '#CD853F');
        }
        
        // Draw secondary winding
        for (let i = 0; i < 5; i++) {
            drawCircle(ctx, 480, 250 + i * 30, 15, '#DEB887');
        }
        
        // Draw core
        drawRect(ctx, 350, 200, 100, 200, '#8B4513');
        
        // Draw input
        drawLine(ctx, 100, 300, 300, 300, '#000', 2);
        drawText(ctx, 'Primary', 200, 280, '16px Arial', '#000', 'center');
        drawText(ctx, `${primaryVoltage}V`, 200, 320, '16px Arial', '#000', 'center');
        
        // Draw output
        drawLine(ctx, 500, 300, 700, 300, '#000', 2);
        drawText(ctx, 'Secondary', 600, 280, '16px Arial', '#000', 'center');
        
        // Calculate secondary voltage
        const secondaryVoltage = (primaryVoltage * secondaryTurns) / primaryTurns;
        drawText(ctx, `${secondaryVoltage.toFixed(2)}V`, 600, 320, '16px Arial', '#000', 'center');
        
        // Calculate currents
        const secondaryCurrent = secondaryVoltage / load;
        const primaryCurrent = secondaryCurrent * (secondaryTurns / primaryTurns);
        
        drawText(ctx, `Primary Current: ${primaryCurrent.toFixed(2)}A`, 200, 400, '14px Arial', '#000', 'center');
        drawText(ctx, `Secondary Current: ${secondaryCurrent.toFixed(2)}A`, 600, 400, '14px Arial', '#000', 'center');
        
        // Draw controls
        drawText(ctx, `Primary Voltage: ${primaryVoltage}V`, 400, 450, '14px Arial', '#000', 'center');
        drawText(ctx, `Primary Turns: ${primaryTurns}`, 400, 480, '14px Arial', '#000', 'center');
        drawText(ctx, `Secondary Turns: ${secondaryTurns}`, 400, 510, '14px Arial', '#000', 'center');
        drawText(ctx, `Load: ${load}Ω`, 400, 540, '14px Arial', '#000', 'center');
    }
    
    function createSlider(label, min, max, value, onChange) {
        const container = document.createElement('div');
        container.style.margin = '10px';
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        container.appendChild(labelElement);
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.addEventListener('input', onChange);
        container.appendChild(slider);
        
        return container;
    }
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    
    container.appendChild(createSlider('Primary Voltage', 100, 1000, primaryVoltage, (e) => {
        primaryVoltage = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Primary Turns', 100, 2000, primaryTurns, (e) => {
        primaryTurns = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Secondary Turns', 10, 1000, secondaryTurns, (e) => {
        secondaryTurns = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Load (Ω)', 1, 100, load, (e) => {
        load = parseInt(e.target.value);
        drawScene();
    }));
    
    drawScene();
    return container;
}

// Unit 16: Electrical Motors
function motorSimulation() {
    const canvas = createCanvas('motorCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    let voltage = 220;
    let current = 5;
    let speed = 1500; // RPM
    let load = 50; // percentage
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw motor body
        drawRect(ctx, 300, 200, 200, 200, '#4682B4');
        drawCircle(ctx, 400, 300, 80, '#B0C4DE');
        
        // Draw shaft
        drawRect(ctx, 480, 290, 100, 20, '#A9A9A9');
        
        // Draw rotor
        const rotorAngle = (Date.now() / 1000 * speed / 60 * 2 * Math.PI) % (2 * Math.PI);
        drawLine(ctx, 400, 300, 400 + Math.cos(rotorAngle) * 70, 300 + Math.sin(rotorAngle) * 70, '#000', 4);
        
        // Draw input
        drawLine(ctx, 100, 300, 300, 300, '#FF0000', 2);
        drawText(ctx, 'Input', 200, 280, '16px Arial', '#000', 'center');
        drawText(ctx, `${voltage}V, ${current}A`, 200, 320, '16px Arial', '#000', 'center');
        
        // Draw output
        drawLine(ctx, 580, 300, 700, 300, '#0000FF', 2);
        drawText(ctx, 'Output', 640, 280, '16px Arial', '#000', 'center');
        drawText(ctx, `${speed} RPM`, 640, 320, '16px Arial', '#000', 'center');
        
        // Calculate and display power
        const inputPower = voltage * current;
        const outputPower = inputPower * (1 - load / 100); // Simplified efficiency calculation
        drawText(ctx, `Input Power: ${inputPower.toFixed(2)}W`, 400, 450, '14px Arial', '#000', 'center');
        drawText(ctx, `Output Power: ${outputPower.toFixed(2)}W`, 400, 480, '14px Arial', '#000', 'center');
        drawText(ctx, `Efficiency: ${((outputPower / inputPower) * 100).toFixed(2)}%`, 400, 510, '14px Arial', '#000', 'center');
        
        // Draw load indicator
        drawRect(ctx, 650, 100, 30, 200, '#D3D3D3');
        drawRect(ctx, 650, 300 - load * 2, 30, load * 2, '#FF6347');
        drawText(ctx, `Load: ${load}%`, 665, 320, '14px Arial', '#000', 'center');
    }
    
    function createSlider(label, min, max, value, onChange) {
        const container = document.createElement('div');
        container.style.margin = '10px';
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        container.appendChild(labelElement);
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.addEventListener('input', onChange);
        container.appendChild(slider);
        
        return container;
    }
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    
    container.appendChild(createSlider('Voltage', 100, 500, voltage, (e) => {
        voltage = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Current', 1, 20, current, (e) => {
        current = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Speed (RPM)', 500, 3000, speed, (e) => {
        speed = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Load (%)', 0, 100, load, (e) => {
        load = parseInt(e.target.value);
        drawScene();
    }));
    
    function animate() {
        drawScene();
        requestAnimationFrame(animate);
    }
    
    animate();
    return container;
}

// Unit 17: Electrical Generators
function generatorSimulation() {
    const canvas = createCanvas('generatorCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    let rpm = 1800;
    let fieldCurrent = 10;
    let load = 50; // percentage
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw generator body
        drawRect(ctx, 300, 200, 200, 200, '#4682B4');
        drawCircle(ctx, 400, 300, 80, '#B0C4DE');
        
        // Draw rotor
        const rotorAngle = (Date.now() / 1000 * rpm / 60 * 2 * Math.PI) % (2 * Math.PI);
        drawLine(ctx, 400, 300, 400 + Math.cos(rotorAngle) * 70, 300 + Math.sin(rotorAngle) * 70, '#FF0000', 4);
        
        // Draw input shaft
        drawRect(ctx, 220, 290, 80, 20, '#A9A9A9');
        drawText(ctx, 'Mechanical Input', 260, 350, '14px Arial', '#000', 'center');
        drawText(ctx, `${rpm} RPM`, 260, 370, '14px Arial', '#000', 'center');
        
        // Draw output
        drawLine(ctx, 500, 300, 700, 300, '#0000FF', 2);
        drawText(ctx, 'Electrical Output', 600, 280, '16px Arial', '#000', 'center');
        
        // Calculate and display output
        const voltage = rpm / 10 * fieldCurrent / 10; // Simplified voltage calculation
        const current = voltage / 10 * load / 100; // Simplified current calculation
        drawText(ctx, `${voltage.toFixed(2)}V, ${current.toFixed(2)}A`, 600, 320, '16px Arial', '#000', 'center');
        
        // Draw field current
        drawLine(ctx, 400, 400, 400, 500, '#00FF00', 2);
        drawText(ctx, 'Field Current', 400, 530, '14px Arial', '#000', 'center');
        drawText(ctx, `${fieldCurrent}A`, 400, 550, '14px Arial', '#000', 'center');
        
        // Calculate and display power
        const outputPower = voltage * current;
        drawText(ctx, `Output Power: ${outputPower.toFixed(2)}W`, 400, 450, '14px Arial', '#000', 'center');
        
        // Draw load indicator
        drawRect(ctx, 650, 100, 30, 200, '#D3D3D3');
        drawRect(ctx, 650, 300 - load * 2, 30, load * 2, '#FF6347');
        drawText(ctx, `Load: ${load}%`, 665, 320, '14px Arial', '#000', 'center');
    }
    
    function createSlider(label, min, max, value, onChange) {
        const container = document.createElement('div');
        container.style.margin = '10px';
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        container.appendChild(labelElement);
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.addEventListener('input', onChange);
        container.appendChild(slider);
        
        return container;
    }
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    
    container.appendChild(createSlider('RPM', 1200, 3600, rpm, (e) => {
        rpm = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Field Current', 1, 20, fieldCurrent, (e) => {
        fieldCurrent = parseInt(e.target.value);
        drawScene();
    }));
    
    container.appendChild(createSlider('Load (%)', 0, 100, load, (e) => {
        load = parseInt(e.target.value);
        drawScene();
    }));
    
    function animate() {
        drawScene();
        requestAnimationFrame(animate);
    }
    
    animate();
    return container;
}

// Unit 18: Electrical Power Distribution
function powerDistributionSimulation() {
    const canvas = createCanvas('powerDistributionCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Power Plant', x: 100, y: 300, voltage: 25000, load: 0 },
        { name: 'Step-up Transformer', x: 250, y: 300, voltage: 400000, load: 0 },
        { name: 'Transmission Lines', x: 400, y: 300, voltage: 400000, load: 0 },
        { name: 'Step-down Transformer', x: 550, y: 300, voltage: 11000, load: 0 },
        { name: 'Distribution Lines', x: 700, y: 300, voltage: 11000, load: 0 }
    ];
    
    const consumers = [
        { name: 'Factory', x: 650, y: 450, load: 0 },
        { name: 'Residential Area', x: 700, y: 450, load: 0 },
        { name: 'Commercial Center', x: 750, y: 450, load: 0 }
    ];
    
    let totalLoad = 0;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw components
        components.forEach((comp, index) => {
            drawRect(ctx, comp.x - 40, comp.y - 30, 80, 60, '#4682B4');
            drawText(ctx, comp.name, comp.x, comp.y + 50, '12px Arial', '#000', 'center');
            drawText(ctx, `${comp.voltage}V`, comp.x, comp.y + 70, '12px Arial', '#000', 'center');
            drawText(ctx, `Load: ${comp.load.toFixed(2)}MW`, comp.x, comp.y + 90, '12px Arial', '#000', 'center');
            
            if (index < components.length - 1) {
                drawLine(ctx, comp.x + 40, comp.y, components[index + 1].x - 40, components[index + 1].y, '#000', 2);
            }
        });
        
        // Draw consumers
        consumers.forEach(consumer => {
            drawRect(ctx, consumer.x - 30, consumer.y - 20, 60, 40, '#90EE90');
            drawText(ctx, consumer.name, consumer.x, consumer.y + 40, '12px Arial', '#000', 'center');
            drawText(ctx, `${consumer.load.toFixed(2)}MW`, consumer.x, consumer.y + 60, '12px Arial', '#000', 'center');
            drawLine(ctx, consumer.x, consumer.y - 20, consumer.x, 330, '#000', 2);
        });
        
        // Draw total load
        drawText(ctx, `Total Load: ${totalLoad.toFixed(2)}MW`, 400, 50, '16px Arial', '#000', 'center');
    }
    
    function updateLoads() {
        totalLoad = consumers.reduce((sum, consumer) => sum + consumer.load, 0);
        
        components.forEach(comp => {
            comp.load = totalLoad;
        });
        
        drawScene();
    }
    
    function createSlider(consumer) {
        const container = document.createElement('div');
        container.style.margin = '10px';
        
        const label = document.createElement('label');
        label.textContent = `${consumer.name} Load (MW):`;
        container.appendChild(label);
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = consumer.load;
        slider.addEventListener('input', (e) => {
            consumer.load = parseFloat(e.target.value);
            updateLoads();
        });
        container.appendChild(slider);
        
        return container;
    }
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    
    consumers.forEach(consumer => {
        container.appendChild(createSlider(consumer));
    });
    
    updateLoads();
    return container;
}

// Unit 19: Electrical Switchgear
function switchgearSimulation() {
    const canvas = createCanvas('switchgearCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const components = [
        { name: 'Main Circuit Breaker', x: 100, y: 100, state: 'closed' },
        { name: 'Bus Bar', x: 400, y: 100, state: 'on' },
        { name: 'Feeder 1', x: 250, y: 250, state: 'closed' },
        { name: 'Feeder 2', x: 400, y: 250, state: 'closed' },
        { name: 'Feeder 3', x: 550, y: 250, state: 'closed' }
    ];
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw main circuit breaker
        drawCircle(ctx, components[0].x, components[0].y, 30, components[0].state === 'closed' ? '#4CAF50' : '#FF6347');
        drawText(ctx, components[0].name, components[0].x, components[0].y + 50, '12px Arial', '#000', 'center');
        
        // Draw bus bar
        drawRect(ctx, components[1].x - 200, components[1].y - 10, 400, 20, components[1].state === 'on' ? '#4CAF50' : '#FF6347');
        drawText(ctx, components[1].name, components[1].x, components[1].y + 30, '12px Arial', '#000', 'center');
        
        // Draw feeders
        for (let i = 2; i < components.length; i++) {
            drawCircle(ctx, components[i].x, components[i].y, 20, components[i].state === 'closed' ? '#4CAF50' : '#FF6347');
            drawText(ctx, components[i].name, components[i].x, components[i].y + 40, '12px Arial', '#000', 'center');
            drawLine(ctx, components[i].x, components[i].y - 20, components[i].x, components[1].y + 10, '#000', 2);
        }
        
        // Draw connection between main circuit breaker and bus bar
        drawLine(ctx, components[0].x + 30, components[0].y, components[1].x - 200, components[1].y, '#000', 2);
    }
    
    function toggleComponent(comp) {
        if (comp.name === 'Bus Bar') {
            comp.state = comp.state === 'on' ? 'off' : 'on';
        } else {
            comp.state = comp.state === 'closed' ? 'open' : 'closed';
        }
        
        // If main circuit breaker is open, turn off bus bar and open all feeders
        if (components[0].state === 'open') {
            components[1].state = 'off';
            for (let i = 2; i < components.length; i++) {
                components[i].state = 'open';
            }
        }
        
        drawScene();
    }
    
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        components.forEach(comp => {
            if (comp.name === 'Bus Bar') {
                if (x >= comp.x - 200 && x <= comp.x + 200 && y >= comp.y - 10 && y <= comp.y + 10) {
                    toggleComponent(comp);
                }
            } else {
                const radius = comp.name === 'Main Circuit Breaker' ? 30 : 20;
                if (Math.sqrt((x - comp.x)**2 + (y - comp.y)**2) <= radius) {
                    toggleComponent(comp);
                }
            }
        });
    });
    
    drawScene();
    return canvas;
}

// ... (previous code remains unchanged)

// Unit 21: Electrical Renewable Energy Systems
function renewableEnergySimulation() {
    const canvas = createCanvas('renewableEnergyCanvas', 800, 600);
    const ctx = canvas.getContext('2d');
    
    const systems = [
        { name: 'Solar Panel', x: 100, y: 100, power: 0, efficiency: 0.2 },
        { name: 'Wind Turbine', x: 300, y: 100, power: 0, efficiency: 0.35 },
        { name: 'Hydroelectric', x: 500, y: 100, power: 0, efficiency: 0.9 }
    ];
    
    let solarIntensity = 50;
    let windSpeed = 5;
    let waterFlow = 50;
    
    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw solar panel
        drawRect(ctx, 50, 100, 100, 60, '#4682B4');
        drawLine(ctx, 100, 160, 100, 200, '#000', 2);
        drawText(ctx, 'Solar Panel', 100, 220, '14px Arial', '#000', 'center');
        drawText(ctx, `${systems[0].power.toFixed(2)}kW`, 100, 240, '14px Arial', '#000', 'center');
        
        // Draw wind turbine
        drawRect(ctx, 290, 100, 20, 100, '#A0522D');
        drawCircle(ctx, 300, 100, 50, '#F0F0F0');
        for (let i = 0; i < 3; i++) {
            const angle = i * 2 * Math.PI / 3 + Date.now() / 1000 * windSpeed / 5;
            drawLine(ctx, 300, 100, 300 + Math.cos(angle) * 40, 100 + Math.sin(angle) * 40, '#000', 2);
        }
        drawText(ctx, 'Wind Turbine', 300, 220, '14px Arial', '#000', 'center');
        drawText(ctx, `${systems[1].power.toFixed(2)}kW`, 300, 240, '14px Arial', '#000', 'center');
        
        // Draw hydroelectric dam
        drawRect(ctx, 450, 100, 100, 100, '#A0522D');
        drawRect(ctx, 470, 150, 60, 30, '#4682B4');
        drawLine(ctx, 500, 180, 500, 200, '#4682B4', 5);
        drawText(ctx, 'Hydroelectric', 500, 220, '14px Arial', '#000', 'center');
        drawText(ctx, `${systems[2].power.toFixed(2)}kW`, 500, 240, '14px Arial', '#000', 'center');
        
        // Draw total power
        const totalPower = systems.reduce((sum, system) => sum + system.power, 0);
        drawText(ctx, `Total Power: ${totalPower.toFixed(2)}kW`, 400, 50, '18px Arial', '#000', 'center');
        
        // Draw controls
        drawText(ctx, `Solar Intensity: ${solarIntensity}%`, 100, 300, '14px Arial', '#000', 'center');
        drawText(ctx, `Wind Speed: ${windSpeed}m/s`, 300, 300, '14px Arial', '#000', 'center');
        drawText(ctx, `Water Flow: ${waterFlow}%`, 500, 300, '14px Arial', '#000', 'center');
    }
    
    function updatePower() {
        systems[0].power = solarIntensity * systems[0].efficiency / 5;
        systems[1].power = Math.pow(windSpeed, 3) * systems[1].efficiency / 100;
        systems[2].power = waterFlow * systems[2].efficiency / 50;
        drawScene();
    }
    
    function createSlider(label, min, max, value, onChange) {
        const container = document.createElement('div');
        container.style.margin = '10px';
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        container.appendChild(labelElement);
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.addEventListener('input', onChange);
        container.appendChild(slider);
        
        return container;
    }
    
    const container = document.createElement('div');
    container.appendChild(canvas);
    
    container.appendChild(createSlider('Solar Intensity (%)', 0, 100, solarIntensity, (e) => {
        solarIntensity = parseInt(e.target.value);
        updatePower();
    }));
    
    container.appendChild(createSlider('Wind Speed (m/s)', 0, 20, windSpeed, (e) => {
        windSpeed = parseInt(e.target.value);
        updatePower();
    }));
    
    container.appendChild(createSlider('Water Flow (%)', 0, 100, waterFlow, (e) => {
        waterFlow = parseInt(e.target.value);
        updatePower();
    }));
    
    updatePower();
    return container;
}

// Initialize all simulations when the script loads
document.addEventListener('DOMContentLoaded', function() {
    const simulations = [
        { id: 'safetyGearSimulation', func: safetyGearSimulation },
        { id: 'ohmsLawSimulation', func: ohmsLawSimulation },
        { id: 'transistorSimulation', func: transistorSimulation },
        { id: 'energySourceSimulation', func: energySourceSimulation },
        { id: 'toolIdentificationSimulation', func: toolIdentificationSimulation },
        { id: 'wiringDiagramSimulation', func: wiringDiagramSimulation },
        { id: 'multimeterSimulation', func: multimeterSimulation },
        { id: 'resistanceTestingSimulation', func: resistanceTestingSimulation },
        { id: 'electricalMachineSimulation', func: electricalMachineSimulation },
        { id: 'electricalCircuitSimulation', func: electricalCircuitSimulation },
        { id: 'electricalInstallationSimulation', func: electricalInstallationSimulation },
        { id: 'electricalMaintenanceSimulation', func: electricalMaintenanceSimulation },
        { id: 'electricalFaultFindingSimulation', func: electricalFaultFindingSimulation },
        { id: 'electricalProtectionSimulation', func: electricalProtectionSimulation },
        { id: 'transformerSimulation', func: transformerSimulation },
        { id: 'motorSimulation', func: motorSimulation },
        { id: 'generatorSimulation', func: generatorSimulation },
        { id: 'powerDistributionSimulation', func: powerDistributionSimulation },
        { id: 'switchgearSimulation', func: switchgearSimulation },
        { id: 'substationSimulation', func: substationSimulation },
        { id: 'renewableEnergySimulation', func: renewableEnergySimulation }
    ];

    simulations.forEach(sim => {
        const container = document.getElementById(sim.id);
        if (container) {
            container.appendChild(sim.func());
        }
    });
});