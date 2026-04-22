/* ============================================
   无菌组培苗数字化管理系统
   Data Layer v2.0 | Agastache Specific
   ============================================ */

const DATA = {
  // ===== 全局配置 =====
  config: {
    plantName: '藿香',
    plantLatin: 'Agastache rugosa',
    projectName: '无菌组培苗系统',
    location: '广东省佛山市高明区梧桐村',
    survivalTarget: 90,
    version: '2.0'
  },

  // ===== 批次数据 =====
  batches: [
    { id: 'HX2026-001', stage: '移栽', total: 5000, survival: 4720, contamination: 180, startDate: '2025-11-01', currentPhase: '移栽养护', status: '已完成', operator: '李技术员', qualityGrade: 'A级', remark: '第一批春植苗' },
    { id: 'HX2026-002', stage: '炼苗', total: 6000, survival: 5520, contamination: 210, startDate: '2026-01-10', currentPhase: '温室炼苗', status: '进行中', operator: '王技术员', qualityGrade: 'A级', remark: '温室适应性驯化' },
    { id: 'HX2026-003', stage: '扩繁', total: 8000, survival: 7560, contamination: 156, startDate: '2026-02-15', currentPhase: '继代扩繁第3代', status: '进行中', operator: '李技术员', qualityGrade: 'A+级', remark: '优良株系扩繁' },
    { id: 'HX2026-004', stage: '培养', total: 10000, survival: 9400, contamination: 320, startDate: '2026-03-01', currentPhase: '初代培养', status: '进行中', operator: '张技术员', qualityGrade: '待定', remark: '新外植体培养' },
    { id: 'HX2026-005', stage: '灭菌', total: 3000, survival: 0, contamination: 0, startDate: '2026-04-10', currentPhase: '表面灭菌处理', status: '进行中', operator: '王技术员', qualityGrade: '待定', remark: '春季采集外植体' },
    { id: 'HX2026-006', stage: '移栽', total: 4500, survival: 4230, contamination: 90, startDate: '2025-09-15', currentPhase: '田间移栽', status: '已完成', operator: '李技术员', qualityGrade: 'A级', remark: '秋植苗已稳定' },
  ],

  // ===== 全流程溯源阶段 =====
  stages: [
    {
      id: 'explant', name: '外植体选择', icon: '🌿', order: 1,
      description: '从健康母株上选取藿香茎尖、茎段或叶片作为外植体',
      standards: ['母株生长健壮无病虫害', '选取带腋芽的茎段2-3cm', '最佳取材时间: 4-5月/9-10月'],
      params: [
        { name: '母株编号', type: 'text' },
        { name: '取材部位', type: 'select', options: ['茎尖', '茎段', '叶片'] },
        { name: '取材日期', type: 'date' },
        { name: '材料状态', type: 'select', options: ['优良', '一般', '不合格'] },
      ],
      images: ['huoxiang_01.jpg']
    },
    {
      id: 'sterilize', name: '灭菌处理', icon: '🧪', order: 2,
      description: '对外植体进行表面消毒灭菌，去除微生物污染',
      standards: ['75%乙醇浸泡30秒', '0.1%升汞溶液灭菌8-10分钟', '无菌水冲洗4-5次'],
      params: [
        { name: '灭菌剂', type: 'select', options: ['75%乙醇+0.1%HgCl₂', 'NaClO溶液'] },
        { name: '灭菌时长', type: 'number', unit: '分钟' },
        { name: '无菌水冲洗次数', type: 'number', unit: '次' },
        { name: '污染检查', type: 'select', options: ['无污染', '轻微污染', '严重污染'] },
      ],
      images: []
    },
    {
      id: 'medium', name: '培养基配制', icon: '🧫', order: 3,
      description: '配制藿香专用培养基，提供营养与生长调节物质',
      standards: ['MS培养基为基本培养基', '添加6-BA 1.0mg/L + NAA 0.1mg/L', '蔗糖30g/L，琼脂6g/L，pH 5.8'],
      params: [
        { name: '培养基类型', type: 'select', options: ['MS+6-BA1.0+NAA0.1', 'MS+6-BA2.0+NAA0.2', '1/2MS+NAA0.5'] },
        { name: 'pH值', type: 'number', unit: '' },
        { name: '配制日期', type: 'date' },
        { name: '灭菌方式', type: 'select', options: ['121℃高压蒸汽20min', '过滤灭菌'] },
      ],
      images: []
    },
    {
      id: 'propagate', name: '扩繁增殖', icon: '🌱', order: 4,
      description: '通过继代培养快速扩繁藿香组培苗，实现规模化生产',
      standards: ['培养温度25±2℃', '光照强度1500-2000lx', '光照周期16h/8h', '每30天继代一次'],
      params: [
        { name: '继代次数', type: 'number', unit: '次' },
        { name: '增殖系数', type: 'number', unit: '倍' },
        { name: '培养温度', type: 'number', unit: '℃' },
        { name: '污染率', type: 'number', unit: '%' },
      ],
      images: []
    },
    {
      id: 'acclimate', name: '炼苗驯化', icon: '🏡', order: 5,
      description: '将组培苗从培养瓶移至温室进行适应性驯化',
      standards: ['温室温度20-28℃', '相对湿度70-85%', '逐步降低湿度至60%', '遮光处理7天'],
      params: [
        { name: '移出日期', type: 'date' },
        { name: '温室温度', type: 'number', unit: '℃' },
        { name: '空气湿度', type: 'number', unit: '%' },
        { name: '驯化天数', type: 'number', unit: '天' },
        { name: '成活株数', type: 'number', unit: '株' },
      ],
      images: ['huoxiang_02.jpg']
    },
    {
      id: 'transplant', name: '移栽定植', icon: '🌳', order: 6,
      description: '炼苗完成后将藿香苗移栽至田间或基质中定植',
      standards: ['基质配比: 泥炭:珍珠岩=3:1', '定植密度30cm×30cm', '定植后浇透定根水', '遮阴7-10天'],
      params: [
        { name: '移栽日期', type: 'date' },
        { name: '基质配比', type: 'text' },
        { name: '定植株数', type: 'number', unit: '株' },
        { name: '定植面积', type: 'number', unit: '亩' },
        { name: '田间成活率', type: 'number', unit: '%' },
      ],
      images: []
    }
  ],

  // ===== 种苗档案 =====
  seedlings: [
    { id: 'SH001', batchId: 'HX2026-001', source: '茎尖', motherPlant: 'MH-FS-003', stage: '移栽养护', healthStatus: '优良', height: '12.5cm', leafCount: 8, rootStatus: '发达', createDate: '2025-11-01', days: 167, qualityScore: 96 },
    { id: 'SH002', batchId: 'HX2026-002', source: '茎段', motherPlant: 'MH-FS-005', stage: '炼苗驯化', healthStatus: '优良', height: '8.2cm', leafCount: 6, rootStatus: '正常', createDate: '2026-01-10', days: 97, qualityScore: 93 },
    { id: 'SH003', batchId: 'HX2026-003', source: '茎尖', motherPlant: 'MH-FS-008', stage: '继代扩繁', healthStatus: '优良', height: '5.8cm', leafCount: 4, rootStatus: '待诱导', createDate: '2026-02-15', days: 61, qualityScore: 98 },
    { id: 'SH004', batchId: 'HX2026-004', source: '茎段', motherPlant: 'MH-FS-012', stage: '初代培养', healthStatus: '正常', height: '2.1cm', leafCount: 2, rootStatus: '未诱导', createDate: '2026-03-01', days: 46, qualityScore: 88 },
    { id: 'SH005', batchId: 'HX2026-001', source: '茎尖', motherPlant: 'MH-FS-003', stage: '移栽养护', healthStatus: '良好', height: '10.8cm', leafCount: 7, rootStatus: '发达', createDate: '2025-11-05', days: 163, qualityScore: 91 },
    { id: 'SH006', batchId: 'HX2026-003', source: '叶片', motherPlant: 'MH-FS-008', stage: '继代扩繁', healthStatus: '正常', height: '4.5cm', leafCount: 3, rootStatus: '待诱导', createDate: '2026-02-20', days: 56, qualityScore: 85 },
    { id: 'SH007', batchId: 'HX2026-002', source: '茎尖', motherPlant: 'MH-FS-010', stage: '炼苗驯化', healthStatus: '优良', height: '9.6cm', leafCount: 7, rootStatus: '发达', createDate: '2026-01-15', days: 92, qualityScore: 95 },
    { id: 'SH008', batchId: 'HX2026-006', source: '茎段', motherPlant: 'MH-FS-002', stage: '田间定植', healthStatus: '优良', height: '28.5cm', leafCount: 16, rootStatus: '发达', createDate: '2025-09-20', days: 209, qualityScore: 97 },
  ],

  // ===== 环境监测数据（24h模拟） =====
  environment: {
    current: {
      temperature: 25.3,
      humidity: 72,
      light: 1850,
      co2: 420,
      ph: 5.8
    },
    hourly: Array.from({length: 24}, (_, i) => ({
      hour: `${String(i).padStart(2, '0')}:00`,
      temperature: +(22 + Math.sin((i - 6) * Math.PI / 12) * 4 + Math.random() * 0.5).toFixed(1),
      humidity: +(68 + Math.sin((i - 3) * Math.PI / 12) * 8 + Math.random() * 2).toFixed(1),
      light: Math.max(0, Math.floor(1500 + Math.sin((i - 8) * Math.PI / 10) * 1200 + Math.random() * 100)),
      co2: Math.floor(380 + Math.sin((i - 4) * Math.PI / 12) * 60 + Math.random() * 20)
    })),
    alerts: [
      { time: '08:30', type: 'warning', message: '3号培养室温度偏高(27.8℃)，已启动通风降温' },
      { time: '14:15', type: 'info', message: '温室湿度正常，当前72%' },
      { time: '09:00', type: 'success', message: '1号培养室光照强度达标(1860lx)' },
    ],
    thresholds: {
      temperature: { min: 22, max: 28, optimal: 25 },
      humidity: { min: 60, max: 85, optimal: 70 },
      light: { min: 1200, max: 2500, optimal: 1800 },
      co2: { min: 300, max: 600, optimal: 400 },
      ph: { min: 5.4, max: 6.2, optimal: 5.8 }
    }
  },

  // ===== 物料数据 =====
  materials: [
    { id: 'ML001', name: 'MS培养基粉剂', category: '培养基', unit: 'L', stock: 45, minStock: 20, price: 28.5, supplier: '北京鼎国昌盛', lastRestock: '2026-03-15', expiry: '2027-03-15' },
    { id: 'ML002', name: '6-BA (6-苄氨基嘌呤)', category: '激素', unit: 'g', stock: 5.2, minStock: 2, price: 380, supplier: 'Sigma-Aldrich', lastRestock: '2026-02-20', expiry: '2028-02-20' },
    { id: 'ML003', name: 'NAA (萘乙酸)', category: '激素', unit: 'g', stock: 3.8, minStock: 1.5, price: 260, supplier: 'Sigma-Aldrich', lastRestock: '2026-02-20', expiry: '2028-02-20' },
    { id: 'ML004', name: '蔗糖(分析纯)', category: '碳源', unit: 'kg', stock: 12, minStock: 5, price: 45, supplier: '广州化学试剂', lastRestock: '2026-03-01', expiry: '2027-06-01' },
    { id: 'ML005', name: '琼脂', category: '凝固剂', unit: 'kg', stock: 8.5, minStock: 3, price: 120, supplier: '北京鼎国昌盛', lastRestock: '2026-03-10', expiry: '2027-09-10' },
    { id: 'ML006', name: '75%乙醇', category: '灭菌', unit: 'L', stock: 15, minStock: 5, price: 18, supplier: '广州化学试剂', lastRestock: '2026-04-01', expiry: '2028-04-01' },
    { id: 'ML007', name: '0.1%升汞溶液', category: '灭菌', unit: 'L', stock: 3, minStock: 1, price: 85, supplier: '广州化学试剂', lastRestock: '2026-03-20', expiry: '2027-03-20' },
    { id: 'ML008', name: '培养瓶(组培专用)', category: '耗材', unit: '个', stock: 2000, minStock: 500, price: 3.5, supplier: '浙江海兴', lastRestock: '2026-04-05', expiry: '-' },
    { id: 'ML009', name: '封口膜', category: '耗材', unit: '卷', stock: 30, minStock: 10, price: 25, supplier: '浙江海兴', lastRestock: '2026-03-25', expiry: '-' },
    { id: 'ML010', name: '泥炭土', category: '基质', unit: '袋', stock: 80, minStock: 20, price: 35, supplier: '佛山本地农资', lastRestock: '2026-04-08', expiry: '-' },
    { id: 'ML011', name: '珍珠岩', category: '基质', unit: '袋', stock: 25, minStock: 8, price: 22, supplier: '佛山本地农资', lastRestock: '2026-04-08', expiry: '-' },
    { id: 'ML012', name: 'pH计校准液', category: '仪器配件', unit: '瓶', stock: 4, minStock: 2, price: 65, supplier: '上海仪电', lastRestock: '2026-02-10', expiry: '2027-02-10' },
  ],

  // ===== 设备数据 =====
  equipment: [
    { id: 'EQ001', name: '超净工作台', model: 'SW-CJ-1FD', location: '灭菌室', status: '正常运行', lastMaintenance: '2026-03-20', nextMaintenance: '2026-06-20', usageHours: 4520, brand: '上海博迅' },
    { id: 'EQ002', name: '高压蒸汽灭菌锅', model: 'YXQ-50SII', location: '灭菌室', status: '正常运行', lastMaintenance: '2026-03-25', nextMaintenance: '2026-06-25', usageHours: 3280, brand: '上海博迅' },
    { id: 'EQ003', name: '智能人工气候箱', model: 'RXZ-380C', location: '1号培养室', status: '正常运行', lastMaintenance: '2026-03-15', nextMaintenance: '2026-06-15', usageHours: 5680, brand: '宁波江南' },
    { id: 'EQ004', name: '智能人工气候箱', model: 'RXZ-380C', location: '2号培养室', status: '正常运行', lastMaintenance: '2026-03-18', nextMaintenance: '2026-06-18', usageHours: 5210, brand: '宁波江南' },
    { id: 'EQ005', name: '光照培养箱', model: 'GXZ-280B', location: '3号培养室', status: '温度偏高', lastMaintenance: '2026-02-28', nextMaintenance: '2026-05-28', usageHours: 6120, brand: '宁波江南' },
    { id: 'EQ006', name: '双目生物显微镜', model: 'XS-213', location: '检测室', status: '正常运行', lastMaintenance: '2026-04-01', nextMaintenance: '2026-10-01', usageHours: 1200, brand: '南京江南' },
    { id: 'EQ007', name: '电子分析天平', model: 'FA2004', location: '配制室', status: '正常运行', lastMaintenance: '2026-03-30', nextMaintenance: '2026-09-30', usageHours: 980, brand: '上海舜宇恒平' },
    { id: 'EQ008', name: '温室智能控制系统', model: 'GS-Auto', location: '温室大棚', status: '正常运行', lastMaintenance: '2026-04-10', nextMaintenance: '2026-07-10', usageHours: 8760, brand: '农业物联网' },
    { id: 'EQ009', name: '自动灌溉系统', model: 'AI-200', location: '种植区', status: '正常运行', lastMaintenance: '2026-04-05', nextMaintenance: '2026-07-05', usageHours: 7200, brand: '农业物联网' },
  ],

  // ===== 库存记录 =====
  inventoryLogs: [
    { id: 'INV001', type: '入库', materialName: '培养瓶(组培专用)', quantity: 1000, unit: '个', date: '2026-04-05', operator: '张技术员', remark: '月度补货' },
    { id: 'INV002', type: '出库', materialName: 'MS培养基粉剂', quantity: 5, unit: 'L', date: '2026-04-12', operator: '李技术员', remark: 'HX2026-004批次使用' },
    { id: 'INV003', type: '出库', materialName: '6-BA (6-苄氨基嘌呤)', quantity: 0.5, unit: 'g', date: '2026-04-12', operator: '李技术员', remark: '配制培养基' },
    { id: 'INV004', type: '入库', materialName: '泥炭土', quantity: 40, unit: '袋', date: '2026-04-08', operator: '王技术员', remark: '移栽季备货' },
    { id: 'INV005', type: '出库', materialName: '75%乙醇', quantity: 2, unit: 'L', date: '2026-04-10', operator: '王技术员', remark: 'HX2026-005灭菌' },
    { id: 'INV006', type: '出库', materialName: '琼脂', quantity: 1.5, unit: 'kg', date: '2026-04-11', operator: '张技术员', remark: '配制培养基' },
    { id: 'INV007', type: '入库', materialName: '珍珠岩', quantity: 15, unit: '袋', date: '2026-04-08', operator: '王技术员', remark: '移栽季备货' },
    { id: 'INV008', type: '出库', materialName: '蔗糖(分析纯)', quantity: 2, unit: 'kg', date: '2026-04-13', operator: '李技术员', remark: '继代培养基配制' },
  ],

  // ===== 质检记录 =====
  qualityRecords: [
    { id: 'QC001', batchId: 'HX2026-001', testDate: '2026-04-01', testType: '移栽成活率检测', result: '94.4%', standard: '≥90%', status: '合格', tester: '质检组', notes: '成活株数4720/5000' },
    { id: 'QC002', batchId: 'HX2026-002', testDate: '2026-04-05', testType: '炼苗适应性评估', result: '92.0%', standard: '≥85%', status: '合格', tester: '质检组', notes: '叶片挺立，新根萌发正常' },
    { id: 'QC003', batchId: 'HX2026-003', testDate: '2026-04-08', testType: '增殖系数检测', result: '3.8倍', standard: '≥3.0倍', status: '优秀', tester: '质检组', notes: '增殖效果优异' },
    { id: 'QC004', batchId: 'HX2026-003', testDate: '2026-04-10', testType: '污染率检测', result: '1.95%', standard: '≤5%', status: '合格', tester: '质检组', notes: '156/8000瓶污染' },
    { id: 'QC005', batchId: 'HX2026-004', testDate: '2026-04-12', testType: '初代诱导率', result: '85.2%', standard: '≥70%', status: '合格', tester: '质检组', notes: '外植体萌发正常' },
    { id: 'QC006', batchId: 'HX2026-001', testDate: '2026-03-15', testType: '组培苗形态学检测', result: '叶色浓绿、节间正常', standard: '无明显变异', status: '合格', tester: '质检组', notes: '株型整齐一致' },
    { id: 'QC007', batchId: 'HX2026-006', testDate: '2026-03-20', testType: '移栽成活率检测', result: '94.0%', standard: '≥90%', status: '合格', tester: '质检组', notes: '成活株数4230/4500' },
    { id: 'QC008', batchId: 'HX2026-002', testDate: '2026-04-13', testType: '生根诱导检测', result: '平均根数5.2条', standard: '≥3条', status: '优秀', tester: '质检组', notes: '根系发达健壮' },
  ],

  // ===== 溯源记录（某一批次的完整链路） =====
  traceRecords: {
    'HX2026-001': [
      { stage: '外植体选择', date: '2025-11-01', operator: '李技术员', detail: '从母株MH-FS-003选取茎尖3cm，材料状态优良' },
      { stage: '灭菌处理', date: '2025-11-01', operator: '李技术员', detail: '75%乙醇30s + 0.1%HgCl₂ 8min，无菌水冲洗5次' },
      { stage: '培养基配制', date: '2025-11-02', operator: '张技术员', detail: 'MS+6-BA1.0+NAA0.1，pH5.8，121℃高压灭菌20min' },
      { stage: '扩繁增殖', date: '2025-11-15', operator: '李技术员', detail: '继代3次，增殖系数3.5倍，最终获得5000株' },
      { stage: '炼苗驯化', date: '2026-01-20', operator: '王技术员', detail: '温室炼苗30天，逐步降低湿度至60%，成活率96%' },
      { stage: '移栽定植', date: '2026-02-20', operator: '王技术员', detail: '泥炭:珍珠岩=3:1，定植4720株，成活率94.4%' },
    ]
  },

  // ===== 月度统计数据（用于图表） =====
  monthlyStats: {
    months: ['2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04'],
    production: [2000, 3500, 5000, 5200, 6800, 8000, 10000, 9500],
    survivalRate: [89.2, 90.5, 91.8, 92.1, 91.5, 93.2, 94.0, 94.4],
    contaminationRate: [6.5, 5.2, 4.1, 3.8, 3.5, 2.8, 2.5, 2.0],
    outputCount: [1784, 3168, 4590, 4789, 6222, 7456, 9400, 8968],
  },

  // ===== 质量趋势 =====
  qualityTrend: {
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
    survival: [91, 92, 91.5, 93, 92.8, 93.5, 94, 93.8, 94.2, 94.5, 94.4, 95],
    contamination: [4.5, 4.2, 3.8, 3.5, 3.2, 2.8, 2.5, 2.3, 2.1, 2.0, 1.95, 1.8],
    growthRate: [2.1, 2.3, 2.5, 2.4, 2.6, 2.8, 2.7, 2.9, 3.0, 3.1, 3.0, 3.2],
  },

  // ===== 品种特性 =====
  plantInfo: {
    name: '藿香 (Agastache rugosa)',
    family: '唇形科 (Lamiaceae)',
    uses: '药用(健脾化湿、芳香化浊)、食用(调味香料)、精油提取',
    activeCompounds: '挥发油(甲基胡椒酚、茴香醛)、黄酮类、多糖',
    origin: '广东省佛山市高明区梧桐村 — 无菌组培苗系统基地',
    advantages: '本地优良品种、抗逆性强、挥发油含量高、组培成活率稳定',
    plantCycle: '外植体→灭菌→初代培养→继代扩繁→炼苗→移栽(约150-180天)',
  }
};

// ===== 工具函数 =====
const Utils = {
  // 获取批次状态颜色
  getStatusColor(status) {
    const map = { '已完成': 'success', '进行中': 'info', '待开始': 'warning', '已暂停': 'danger' };
    return map[status] || 'primary';
  },

  // 获取健康状态
  getHealthBadge(status) {
    const map = { '优良': 'success', '良好': 'info', '正常': 'primary', '异常': 'danger' };
    return map[status] || 'primary';
  },

  // 获取质检状态
  getQcBadge(status) {
    const map = { '优秀': 'success', '合格': 'info', '不合格': 'danger', '待检': 'warning' };
    return map[status] || 'primary';
  },

  // 格式化数字
  formatNum(n) {
    if (n >= 10000) return (n / 10000).toFixed(1) + '万';
    return n.toLocaleString();
  },

  // 计算成活率
  calcSurvivalRate(survival, total) {
    if (!total) return '0%';
    return ((survival / total) * 100).toFixed(1) + '%';
  },

  // 计算污染率
  calcContaminationRate(contamination, total) {
    if (!total) return '0%';
    return ((contamination / total) * 100).toFixed(1) + '%';
  },

  // 生成唯一ID
  genId(prefix = 'ID') {
    return prefix + Date.now().toString(36).toUpperCase();
  },

  // 获取当前日期
  today() {
    return new Date().toISOString().split('T')[0];
  },

  // 获取某阶段批次数
  getBatchCountByStage(stage) {
    return DATA.batches.filter(b => b.stage === stage).length;
  },

  // 获取总在培数
  getTotalCulturing() {
    return DATA.batches.filter(b => b.status === '进行中').reduce((s, b) => s + b.total, 0);
  },

  // 获取平均成活率
  getAvgSurvivalRate() {
    const active = DATA.batches.filter(b => b.survival > 0);
    if (!active.length) return 0;
    const totalSurvival = active.reduce((s, b) => s + b.survival, 0);
    const totalAll = active.reduce((s, b) => s + b.total, 0);
    return ((totalSurvival / totalAll) * 100).toFixed(1);
  },

  // 获取总产量
  getTotalOutput() {
    return DATA.batches.reduce((s, b) => s + b.survival, 0);
  },

  // 获取物料预警数
  getMaterialAlerts() {
    return DATA.materials.filter(m => m.stock <= m.minStock * 1.5).length;
  },

  // 获取设备异常数
  getEquipmentAlerts() {
    return DATA.equipment.filter(e => e.status !== '正常运行').length;
  },
};
