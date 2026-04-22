/* ============================================
   无菌组培苗数字化管理系统
   Views v3.1 | All Page Renderers
   ============================================ */

const Views = {

  // ===========================
  // 1. 看板首页 Dashboard
  // ===========================
  dashboard() {
    const totalCulturing = Utils.getTotalCulturing();
    const avgSurvival = Utils.getAvgSurvivalRate();
    const totalOutput = Utils.getTotalOutput();
    const matAlerts = Utils.getMaterialAlerts();
    const eqAlerts = Utils.getEquipmentAlerts();
    const activeBatches = DATA.batches.filter(b => b.status === '进行中').length;

    return `
    <div class="hero-banner fade-in">
      <div class="hero-scan"></div>
      <div class="hero-content">
        <h1>无菌组培苗数字化管理系统</h1>
        <p>基于组织培养技术的全流程数字化管控平台<br>
        覆盖外植体选择→灭菌→培养基→扩繁→炼苗→移栽完整链路，保障成活率 ≥90%</p>
        <div class="hero-stats">
          <div class="hero-stat"><div class="value" data-count="${totalOutput}">${Utils.formatNum(totalOutput)}</div><div class="label">累计产出(株)</div></div>
          <div class="hero-stat"><div class="value">${avgSurvival}%</div><div class="label">平均成活率</div></div>
          <div class="hero-stat"><div class="value">${activeBatches}</div><div class="label">在培批次</div></div>
          <div class="hero-stat"><div class="value" data-count="${totalCulturing}">${Utils.formatNum(totalCulturing)}</div><div class="label">在培总数</div></div>
        </div>
      </div>
      <div class="hero-visual">
        <svg viewBox="0 0 280 210" style="width:100%;max-width:280px" xmlns="http://www.w3.org/2000/svg">
          <!-- 发光底圈 -->
          <circle cx="140" cy="140" r="65" fill="none" stroke="rgba(76,175,80,0.15)" stroke-width="30"/>
          <circle cx="140" cy="140" r="55" fill="none" stroke="rgba(76,175,80,0.1)" stroke-width="4"/>
          <!-- 试管/烧瓶装饰 -->
          <g transform="translate(108,70)">
            <path d="M10 0 L10 40 L0 60 Q-2 68 6 68 L26 68 Q34 68 32 60 L22 40 L22 0 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
            <line x1="6" y1="42" x2="26" y2="42" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
            <!-- 液体 -->
            <path d="M2 55 Q0 68 6 68 L26 68 Q32 68 30 55 Z" fill="rgba(76,175,80,0.5)"/>
            <ellipse cx="16" cy="56" rx="8" ry="2" fill="rgba(165,214,167,0.6)"/>
          </g>
          <!-- 藿香叶片装饰 -->
          <ellipse cx="140" cy="90" rx="42" ry="60" fill="rgba(46,125,50,0.13)" transform="rotate(-18 140 90)"/>
          <ellipse cx="140" cy="90" rx="42" ry="60" fill="rgba(67,160,71,0.1)" transform="rotate(18 140 90)"/>
          <ellipse cx="140" cy="90" rx="28" ry="46" fill="rgba(76,175,80,0.16)"/>
          <!-- 茎 -->
          <line x1="140" y1="145" x2="140" y2="195" stroke="rgba(46,125,50,0.6)" stroke-width="2.5" stroke-linecap="round"/>
          <!-- 叶脉 -->
          <path d="M140 68 Q118 58 103 68" stroke="rgba(129,199,132,0.7)" stroke-width="1.5" fill="none"/>
          <path d="M140 68 Q162 58 177 68" stroke="rgba(129,199,132,0.7)" stroke-width="1.5" fill="none"/>
          <path d="M140 88 Q113 78 96 90" stroke="rgba(129,199,132,0.7)" stroke-width="1.5" fill="none"/>
          <path d="M140 88 Q167 78 184 90" stroke="rgba(129,199,132,0.7)" stroke-width="1.5" fill="none"/>
          <!-- 花穗 -->
          <ellipse cx="140" cy="42" rx="11" ry="16" fill="rgba(102,187,106,0.8)" opacity="0.8"/>
          <circle cx="134" cy="35" r="2.5" fill="rgba(200,230,201,0.9)"/>
          <circle cx="146" cy="37" r="2.5" fill="rgba(200,230,201,0.9)"/>
          <circle cx="140" cy="30" r="2.5" fill="rgba(200,230,201,0.9)"/>
          <!-- 数据标签 -->
          <g transform="translate(14,160)" class="float-badge">
            <rect width="68" height="26" rx="6" fill="rgba(46,125,50,0.9)"/>
            <text x="34" y="17" text-anchor="middle" fill="white" font-size="10.5" font-weight="600">≥90% 成活率</text>
          </g>
          <g transform="translate(198,152)" class="float-badge" style="animation-delay:1s">
            <rect width="62" height="26" rx="6" fill="rgba(30,136,229,0.85)"/>
            <text x="31" y="17" text-anchor="middle" fill="white" font-size="10.5" font-weight="600">全流程追溯</text>
          </g>
          <!-- 闪光点 -->
          <circle cx="100" cy="120" r="2" fill="rgba(255,255,255,0.6)">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="182" cy="105" r="1.5" fill="rgba(255,143,0,0.7)">
            <animate attributeName="opacity" values="0;1;0" dur="3s" begin="0.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="155" cy="170" r="1.5" fill="rgba(200,230,201,0.8)">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </div>

    <!-- 核心指标卡片 -->
    <div class="stat-grid fade-in">
      <div class="stat-card" style="--c:#2e7d32">
        <div class="stat-icon" style="background:rgba(46,125,50,0.1);color:#2e7d32">
          <svg width="22" height="22"><use href="#ic-seedling"/></svg>
        </div>
        <div class="stat-value" data-count="${totalCulturing}">${Utils.formatNum(totalCulturing)}</div>
        <div class="stat-label">当前在培总数</div>
        <div class="stat-trend up">↑ ${DATA.batches.filter(b=>b.status==='进行中').length} 个批次</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(67,160,71,0.1);color:#43a047">
          <svg width="22" height="22"><use href="#ic-check-circle"/></svg>
        </div>
        <div class="stat-value">${avgSurvival}%</div>
        <div class="stat-label">综合成活率</div>
        <div class="stat-trend up">↑ 目标${DATA.config.survivalTarget}%</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(30,136,229,0.1);color:#1e88e5">
          <svg width="22" height="22"><use href="#ic-chart"/></svg>
        </div>
        <div class="stat-value" data-count="${totalOutput}">${Utils.formatNum(totalOutput)}</div>
        <div class="stat-label">累计产出(株)</div>
        <div class="stat-trend up">↑ 持续增长</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(249,168,37,0.1);color:#f9a825">
          <svg width="22" height="22"><use href="#ic-alert"/></svg>
        </div>
        <div class="stat-value">${matAlerts + eqAlerts}</div>
        <div class="stat-label">预警事项</div>
        <div class="stat-trend ${matAlerts+eqAlerts > 0 ? 'down' : 'up'}">${matAlerts+eqAlerts > 0 ? matAlerts+'物料 / '+eqAlerts+'设备' : '一切正常'}</div>
      </div>
    </div>


    <!-- 图表行 -->
    <div class="dashboard-grid fade-in">
      <div class="card">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 月度生产趋势</div>
        </div>
        <div class="chart-container"><canvas id="chartProduction"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 成活率 & 污染率走势</div>
        </div>
        <div class="chart-container"><canvas id="chartRates"></canvas></div>
      </div>
    </div>

    <!-- 批次状态 + 培养流程概览 -->
    <div class="dashboard-grid fade-in" style="margin-top:24px">
      <div class="card">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 批次状态总览</div>
          <button class="btn btn-sm btn-outline" onclick="App.navigate('batches')">查看全部</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>批次号</th><th>阶段</th><th>总数</th><th>成活率</th><th>状态</th></tr></thead>
            <tbody>
              ${DATA.batches.slice(0,5).map(b => `
              <tr>
                <td><strong>${b.id}</strong></td>
                <td>${b.stage}</td>
                <td>${b.total.toLocaleString()}</td>
                <td><span class="badge badge-${b.survival/b.total>=0.9?'success':'warning'}">${Utils.calcSurvivalRate(b.survival,b.total)}</span></td>
                <td><span class="badge badge-${Utils.getStatusColor(b.status)}">${b.status}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 全流程溯源概览</div>
        </div>
        <div class="process-flow">
          ${DATA.stages.map((s, i) => `
            <div class="process-step">
              <div class="step-icon ${i < 2 ? 'active' : ''}" style="background:rgba(46,125,50,0.1)">${s.icon}</div>
              <div class="step-label">${s.name}</div>
            </div>
            ${i < DATA.stages.length - 1 ? '<div class="process-arrow">→</div>' : ''}
          `).join('')}
        </div>
        <div style="margin-top:16px">
          <button class="btn btn-primary btn-sm" onclick="App.navigate('traceability')">🔍 进入全流程溯源</button>
        </div>
      </div>
    </div>

    <!-- 环境快照 -->
    <div class="card fade-in" style="margin-top:24px">
      <div class="card-header">
        <div class="card-title"><span class="icon-dot"></span> 培养环境实时快照</div>
        <button class="btn btn-sm btn-outline" onclick="App.navigate('environment')">详细监测</button>
      </div>
      <div class="widget-grid-4 env-grid-5" style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px">
        <div style="text-align:center;padding:16px;background:var(--primary-50);border-radius:var(--radius-md)">
          <div style="font-size:28px;margin-bottom:4px">🌡️</div>
          <div style="font-size:24px;font-weight:800;color:var(--primary)">${DATA.environment.current.temperature}℃</div>
          <div style="font-size:12px;color:var(--text-secondary)">温度</div>
        </div>
        <div style="text-align:center;padding:16px;background:var(--primary-50);border-radius:var(--radius-md)">
          <div style="font-size:28px;margin-bottom:4px">💧</div>
          <div style="font-size:24px;font-weight:800;color:#1e88e5">${DATA.environment.current.humidity}%</div>
          <div style="font-size:12px;color:var(--text-secondary)">湿度</div>
        </div>
        <div style="text-align:center;padding:16px;background:var(--primary-50);border-radius:var(--radius-md)">
          <div style="font-size:28px;margin-bottom:4px">☀️</div>
          <div style="font-size:24px;font-weight:800;color:var(--accent)">${DATA.environment.current.light}lx</div>
          <div style="font-size:12px;color:var(--text-secondary)">光照</div>
        </div>
        <div style="text-align:center;padding:16px;background:var(--primary-50);border-radius:var(--radius-md)">
          <div style="font-size:28px;margin-bottom:4px">🌬️</div>
          <div style="font-size:24px;font-weight:800;color:#7b1fa2">${DATA.environment.current.co2}ppm</div>
          <div style="font-size:12px;color:var(--text-secondary)">CO₂</div>
        </div>
        <div style="text-align:center;padding:16px;background:var(--primary-50);border-radius:var(--radius-md)">
          <div style="font-size:28px;margin-bottom:4px">🧪</div>
          <div style="font-size:24px;font-weight:800;color:#00897b">${DATA.environment.current.ph}</div>
          <div style="font-size:12px;color:var(--text-secondary)">培养基pH</div>
        </div>
      </div>
    </div>`;
  },

  // ===========================
  // 2. 种苗档案 Seedling Archives
  // ===========================
  seedlings() {
    return `
    <div class="tabs">
      <button class="tab-btn active" data-tab="seedling-list" onclick="App.switchTab(this)">种苗列表</button>
      <button class="tab-btn" data-tab="seedling-plant" onclick="App.switchTab(this)">藿香品种信息</button>
    </div>

    <div id="tab-seedling-list" class="tab-content active">
      <div class="filter-bar">
        <div class="search-input">
          <span class="search-icon">🔍</span>
          <input class="form-input" placeholder="搜索种苗编号/批次号..." id="seedling-search" oninput="App.filterSeedlings()">
        </div>
        <select class="form-select" id="seedling-stage-filter" onchange="App.filterSeedlings()">
          <option value="">全部阶段</option>
          <option>初代培养</option><option>继代扩繁</option><option>炼苗驯化</option><option>移栽养护</option><option>田间定植</option>
        </select>
        <select class="form-select" id="seedling-health-filter" onchange="App.filterSeedlings()">
          <option value="">全部状态</option>
          <option>优良</option><option>良好</option><option>正常</option>
        </select>
        <div style="flex:1"></div>
        <button class="btn btn-primary" onclick="App.openModal('add-seedling')">+ 新增档案</button>
      </div>
      <div class="table-wrapper">
        <table class="data-table" id="seedling-table">
          <thead>
            <tr><th>编号</th><th>批次</th><th>来源</th><th>母株</th><th>阶段</th><th>苗高</th><th>叶数</th><th>根系</th><th>健康</th><th>评分</th><th>操作</th></tr>
          </thead>
          <tbody>
            ${DATA.seedlings.map(s => `
            <tr>
              <td><strong>${s.id}</strong></td>
              <td><span class="badge badge-primary">${s.batchId}</span></td>
              <td>${s.source}</td>
              <td>${s.motherPlant}</td>
              <td>${s.stage}</td>
              <td>${s.height}</td>
              <td>${s.leafCount}</td>
              <td>${s.rootStatus}</td>
              <td><span class="badge badge-${Utils.getHealthBadge(s.healthStatus)}">${s.healthStatus}</span></td>
              <td><strong style="color:${s.qualityScore>=95?'var(--success)':s.qualityScore>=90?'var(--primary)':'var(--warning)'}">${s.qualityScore}</strong></td>
              <td>
                <button class="btn btn-sm btn-ghost" onclick="App.viewSeedling('${s.id}')">详情</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div id="tab-seedling-plant" class="tab-content">
      <div class="widget-grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="icon-dot"></span> 藿香品种档案</div>
          </div>
          <div style="padding:8px 0">
            ${[
              ['学名', DATA.plantInfo.name],
              ['科属', DATA.plantInfo.family],
              ['用途', DATA.plantInfo.uses],
              ['有效成分', DATA.plantInfo.activeCompounds],
              ['产地', DATA.plantInfo.origin],
              ['品种优势', DATA.plantInfo.advantages],
              ['培养周期', DATA.plantInfo.plantCycle],
            ].map(([k, v]) => `<div style="display:flex;margin-bottom:12px"><div style="width:90px;flex-shrink:0;font-weight:600;color:var(--text-secondary);font-size:13px">${k}</div><div style="font-size:13px;line-height:1.6">${v}</div></div>`).join('')}
          </div>
        </div>
        <div class="card" style="padding:24px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div style="background:var(--primary-50);border-radius:var(--radius-md);padding:16px;text-align:center">
              <div style="font-size:36px;margin-bottom:8px">🌿</div>
              <div style="font-size:13px;font-weight:700;color:var(--primary-dark)">药用价值</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.6">健脾化湿<br>芳香化浊<br>和胃止呕</div>
            </div>
            <div style="background:rgba(255,143,0,0.06);border-radius:var(--radius-md);padding:16px;text-align:center">
              <div style="font-size:36px;margin-bottom:8px">🧴</div>
              <div style="font-size:13px;font-weight:700;color:#e65100">精油提取</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.6">甲基胡椒酚<br>茴香醛<br>黄酮类化合物</div>
            </div>
            <div style="background:rgba(30,136,229,0.06);border-radius:var(--radius-md);padding:16px;text-align:center">
              <div style="font-size:36px;margin-bottom:8px">🍲</div>
              <div style="font-size:13px;font-weight:700;color:#1565c0">食用价值</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.6">调味香料<br>藿香粥<br>藿香茶饮</div>
            </div>
            <div style="background:rgba(156,39,176,0.06);border-radius:var(--radius-md);padding:16px;text-align:center">
              <div style="font-size:36px;margin-bottom:8px">🧬</div>
              <div style="font-size:13px;font-weight:700;color:#7b1fa2">组培优势</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.6">抗逆性强<br>挥发油含量高<br>成活率≥90%</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },

  // ===========================
  // 3. 培养流程 Culture Process
  // ===========================
  cultureProcess() {
    return `
    <div class="process-flow" style="margin-bottom:32px">
      ${DATA.stages.map((s, i) => `
        <div class="process-step">
          <div class="step-icon" style="background:rgba(46,125,50,0.1)">${s.icon}</div>
          <div class="step-label">${s.name}</div>
          <div class="step-desc">${s.description.slice(0, 12)}...</div>
        </div>
        ${i < DATA.stages.length - 1 ? '<div class="process-arrow">→</div>' : ''}
      `).join('')}
    </div>

    <div class="tabs">
      ${DATA.stages.map((s, i) => `<button class="tab-btn ${i===0?'active':''}" data-tab="stage-${s.id}" onclick="App.switchTab(this)">${s.icon} ${s.name}</button>`).join('')}
    </div>

    ${DATA.stages.map((s, i) => `
    <div id="tab-stage-${s.id}" class="tab-content ${i===0?'active':''}">
      <div class="widget-grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title">${s.icon} ${s.name}</div>
            <span class="badge badge-info">第${s.order}阶段</span>
          </div>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;line-height:1.7">${s.description}</p>
          <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;color:var(--primary-dark)">📋 操作标准</h4>
          <ul style="list-style:none;margin-bottom:20px">
            ${s.standards.map(st => `<li style="padding:8px 12px;margin-bottom:6px;background:var(--primary-50);border-radius:var(--radius-sm);font-size:13px;display:flex;align-items:center;gap:8px"><span style="color:var(--success)">✓</span>${st}</li>`).join('')}
          </ul>
          <h4 style="font-size:14px;font-weight:700;margin-bottom:10px;color:var(--primary-dark)">📝 记录参数</h4>
          <div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>参数名</th><th>类型</th><th>取值范围</th></tr></thead>
              <tbody>
                ${s.params.map(p => `<tr><td>${p.name}</td><td>${p.type==='select'?'下拉选择':p.type==='date'?'日期':p.type==='number'?'数值':'文本'}</td><td>${p.options ? p.options.join(' / ') : (p.unit ? '0~∞ '+p.unit : '-')}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="icon-dot"></span> ${s.images.length > 0 ? '阶段实物展示' : '关键工艺参数'}</div>
          </div>
          ${s.images.length > 0 ? `
          <div class="img-gallery">
            ${s.images.map(img => `
            <div class="img-card">
              <img src="imgs/${img}" alt="${s.name}">
              <div class="img-info">
                <h4>${s.name}</h4>
                <p>藿香组培实景</p>
              </div>
            </div>`).join('')}
          </div>` : `
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
            ${s.params.map(p => `
            <div style="background:var(--primary-50);border-radius:var(--radius-sm);padding:14px;border-left:3px solid var(--primary)">
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">${p.name}</div>
              <div style="font-size:14px;font-weight:700;color:var(--primary-dark)">${p.type==='select' ? p.options[0] : (p.unit ? '0~∞ '+p.unit : '-')} </div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:4px">${p.type==='select'?'可选: '+p.options.join('/') : p.type==='number'?'数值型参数' : p.type==='date'?'日期型参数' : '文本型参数'}</div>
            </div>`).join('')}
          </div>`}
          <div style="margin-top:20px">
            <h4 style="font-size:14px;font-weight:700;margin-bottom:12px">📊 该阶段批次统计</h4>
            ${DATA.batches.filter(b => b.stage === s.name.replace('选择','').replace('处理','').replace('配制','').replace('增殖','').replace('驯化','').replace('定植','')).length === 0 ?
              `<div class="alert alert-info">当前暂无处于此阶段的批次</div>` :
              DATA.batches.filter(b => b.stage === s.name).slice(0,3).map(b => `
              <div class="trace-card" style="cursor:pointer" onclick="App.viewBatchTrace('${b.id}')">
                <div class="trace-info">
                  <h4>${b.id} <span class="badge badge-${Utils.getStatusColor(b.status)}" style="margin-left:8px">${b.status}</span></h4>
                  <p>${b.currentPhase} · 操作人: ${b.operator} · 成活率 ${Utils.calcSurvivalRate(b.survival, b.total)}</p>
                </div>
              </div>`).join('')
            }
          </div>
        </div>
      </div>
    </div>`).join('')}`;
  },

  // ===========================
  // 4. 全流程溯源 Traceability
  // ===========================
  traceability() {
    return `
    <div class="alert alert-info" style="margin-bottom:20px">
      <span>🔗</span>
      <span>全流程溯源系统支持对每一批次藿香组培苗从外植体采集到最终移栽的全生命周期追踪，扫二维码即可查看完整培养记录。</span>
    </div>

    <div class="tabs">
      <button class="tab-btn active" data-tab="trace-batch" onclick="App.switchTab(this)">批次溯源</button>
      <button class="tab-btn" data-tab="trace-overview" onclick="App.switchTab(this)">溯源看板</button>
    </div>

    <div id="tab-trace-batch" class="tab-content active">
      <div class="filter-bar">
        <label style="font-size:13px;font-weight:600">选择批次：</label>
        <select class="form-select" id="trace-batch-select" onchange="App.loadTrace(this.value)" style="min-width:200px">
          ${DATA.batches.map(b => `<option value="${b.id}">${b.id} — ${b.stage} (${b.status})</option>`).join('')}
        </select>
        <div style="flex:1"></div>
        <button class="btn btn-primary" onclick="App.generateQR()">📱 生成溯源码</button>
      </div>

      <div id="trace-content">
        ${this._renderTrace('HX2026-001')}
      </div>
    </div>

    <div id="tab-trace-overview" class="tab-content">
      <div class="widget-grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="icon-dot"></span> 各阶段批次分布</div>
          </div>
          <div class="chart-container"><canvas id="chartStageDist"></canvas></div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="icon-dot"></span> 批次培养周期统计</div>
          </div>
          <div class="chart-container"><canvas id="chartCycleTime"></canvas></div>
        </div>
      </div>
    </div>`;
  },

  _renderTrace(batchId) {
    const batch = DATA.batches.find(b => b.id === batchId);
    if (!batch) return '<div class="empty-state"><div class="icon">📋</div><h3>未找到该批次记录</h3></div>';

    const records = DATA.traceRecords[batchId] || [];
    const stageNames = DATA.stages.map(s => s.name);
    const currentStageIdx = stageNames.indexOf(batch.stage);

    return `
    <div class="card fade-in" style="margin-bottom:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
        <div>
          <h3 style="font-size:20px;font-weight:800">${batch.id}</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:4px">${batch.remark} · 开始日期: ${batch.startDate} · 操作人: ${batch.operator}</p>
        </div>
        <div style="display:flex;gap:16px;align-items:center">
          <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--primary)">${batch.total.toLocaleString()}</div><div style="font-size:11px;color:var(--text-muted)">总数</div></div>
          <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--success)">${Utils.calcSurvivalRate(batch.survival, batch.total)}</div><div style="font-size:11px;color:var(--text-muted)">成活率</div></div>
          <div style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--danger)">${Utils.calcContaminationRate(batch.contamination, batch.total)}</div><div style="font-size:11px;color:var(--text-muted)">污染率</div></div>
          <span class="badge badge-${Utils.getStatusColor(batch.status)}" style="font-size:14px;padding:6px 16px">${batch.status}</span>
        </div>
      </div>

      <!-- 流程进度 -->
      <div class="process-flow" style="margin-bottom:28px">
        ${DATA.stages.map((s, i) => {
          const isDone = i <= currentStageIdx && batch.status === '已完成';
          const isCurrent = i === currentStageIdx && batch.status !== '已完成';
          const dotClass = isDone ? 'completed' : isCurrent ? 'current' : 'pending';
          return `
          <div class="process-step">
            <div class="step-icon ${isCurrent ? 'active' : ''}" style="background:${isDone ? 'rgba(67,160,71,0.1)' : isCurrent ? 'rgba(255,143,0,0.1)' : 'rgba(0,0,0,0.05)'}">${s.icon}</div>
            <div class="step-label" style="color:${isDone ? 'var(--success)' : isCurrent ? 'var(--accent)' : 'var(--text-muted)'}">${s.name}</div>
          </div>
          ${i < DATA.stages.length - 1 ? '<div class="process-arrow">→</div>' : ''}
        `}).join('')}
      </div>
    </div>

    <!-- 溯源时间线 -->
    <div class="card fade-in">
      <div class="card-header">
        <div class="card-title"><span class="icon-dot"></span> 全流程溯源记录</div>
      </div>
      <div class="timeline">
        ${records.map(r => {
          const stageData = DATA.stages.find(s => s.name === r.stage);
          return `
          <div class="timeline-item">
            <div class="timeline-dot completed"></div>
            <div class="timeline-content">
              <h4>${r.stage} ${stageData ? stageData.icon : ''}</h4>
              <p>${r.detail}</p>
              <div class="timeline-meta">📅 ${r.date} · 👤 ${r.operator}</div>
            </div>
            <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
              ${(() => {
                const sd = DATA.stages.find(s => s.name === r.stage);
                if (!sd) return '';
                return sd.params.slice(0,3).map(p =>
                  `<span style="display:inline-block;padding:4px 10px;background:var(--primary-50);border-radius:var(--radius-sm);font-size:11px;color:var(--primary-dark)">${p.name}: ${p.type==='select' ? p.options[0] : (p.unit ? '— '+p.unit : '—')}</span>`
                ).join('');
              })()}
            </div>
          </div>
        `}).join('')}
      </div>
    </div>`;
  },

  // ===========================
  // 5. 环境监测 Environment Monitor
  // ===========================
  environment() {
    const env = DATA.environment;
    return `
    <!-- 实时指标 -->
    <div class="widget-grid fade-in env-grid-5" style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:24px">
      ${[
        ['🌡️', '温度', env.current.temperature, '℃', env.thresholds.temperature],
        ['💧', '湿度', env.current.humidity, '%', env.thresholds.humidity],
        ['☀️', '光照', env.current.light, 'lx', env.thresholds.light],
        ['🌬️', 'CO₂', env.current.co2, 'ppm', env.thresholds.co2],
        ['🧪', 'pH', env.current.ph, '', env.thresholds.ph],
      ].map(([icon, label, val, unit, th]) => {
        const inRange = val >= th.min && val <= th.max;
        return `
        <div class="card" style="text-align:center;padding:20px;border-left:4px solid ${inRange ? 'var(--success)' : 'var(--danger)'}">
          <div style="font-size:32px;margin-bottom:8px">${icon}</div>
          <div style="font-size:28px;font-weight:900;color:${inRange ? 'var(--success)' : 'var(--danger)'}">${val}<span style="font-size:14px;font-weight:400">${unit}</span></div>
          <div style="font-size:13px;color:var(--text-secondary);margin-top:4px">${label}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:8px">范围: ${th.min}~${th.max} ${unit}</div>
          <div class="progress-bar" style="margin-top:10px">
            <div class="progress-fill ${inRange ? 'green' : 'red'}" style="width:${Math.min(100, ((val - th.min) / (th.max - th.min)) * 100)}%"></div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- 告警 -->
    <div class="card fade-in" style="margin-bottom:24px">
      <div class="card-header">
        <div class="card-title"><span class="icon-dot"></span> 实时告警</div>
      </div>
      ${env.alerts.map(a => `
        <div class="alert alert-${a.type}">
          <span>${a.type==='warning'?'⚠️':a.type==='info'?'ℹ️':'✅'}</span>
          <span><strong>${a.time}</strong> — ${a.message}</span>
        </div>
      `).join('')}
    </div>

    <!-- 图表 -->
    <div class="dashboard-grid fade-in">
      <div class="card">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 24小时温度 & 湿度</div>
        </div>
        <div class="chart-container"><canvas id="chartEnvTemp"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 24小时光照 & CO₂</div>
        </div>
        <div class="chart-container"><canvas id="chartEnvLight"></canvas></div>
      </div>
    </div>`;
  },

  // ===========================
  // 6. 物料管理 Materials
  // ===========================
  materials() {
    const lowStock = DATA.materials.filter(m => m.stock <= m.minStock * 1.5);
    const categories = [...new Set(DATA.materials.map(m => m.category))];

    return `
    ${lowStock.length > 0 ? `
    <div class="alert alert-warning">
      <span>⚠️</span>
      <span><strong>${lowStock.length} 种物料库存偏低</strong>：${lowStock.map(m => `${m.name}(${m.stock}${m.unit})`).join('、')}，建议尽快补货。</span>
    </div>` : ''}

    <div class="stat-grid fade-in">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(30,136,229,0.1);color:#1e88e5">📦</div>
        <div class="stat-value">${DATA.materials.length}</div>
        <div class="stat-label">物料种类</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(249,168,37,0.1);color:#f9a825">⚠️</div>
        <div class="stat-value">${lowStock.length}</div>
        <div class="stat-label">库存预警</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(46,125,50,0.1);color:#2e7d32">💰</div>
        <div class="stat-value">¥${DATA.materials.reduce((s,m) => s + m.stock * m.price, 0).toLocaleString()}</div>
        <div class="stat-label">库存总价值</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(156,39,176,0.1);color:#9c27b0">📁</div>
        <div class="stat-value">${categories.length}</div>
        <div class="stat-label">物料分类</div>
      </div>
    </div>

    <div class="filter-bar fade-in">
      <div class="search-input">
        <span class="search-icon">🔍</span>
        <input class="form-input" placeholder="搜索物料名称..." id="material-search" oninput="App.filterMaterials()">
      </div>
      <select class="form-select" id="material-cat-filter" onchange="App.filterMaterials()">
        <option value="">全部分类</option>
        ${categories.map(c => `<option>${c}</option>`).join('')}
      </select>
      <select class="form-select" id="material-stock-filter" onchange="App.filterMaterials()">
        <option value="">全部状态</option>
        <option value="low">库存偏低</option>
        <option value="normal">库存正常</option>
      </select>
      <div style="flex:1"></div>
      <button class="btn btn-primary" onclick="App.openModal('add-material')">+ 新增物料</button>
    </div>

    <div class="table-wrapper fade-in">
      <table class="data-table" id="material-table">
        <thead>
          <tr><th>编号</th><th>名称</th><th>分类</th><th>库存</th><th>安全库存</th><th>状态</th><th>单价(¥)</th><th>供应商</th><th>有效期</th><th>操作</th></tr>
        </thead>
        <tbody>
          ${DATA.materials.map(m => {
            const isLow = m.stock <= m.minStock * 1.5;
            return `
          <tr>
            <td>${m.id}</td>
            <td><strong>${m.name}</strong></td>
            <td><span class="badge badge-primary">${m.category}</span></td>
            <td>${m.stock} ${m.unit}</td>
            <td>${m.minStock} ${m.unit}</td>
            <td><span class="badge badge-${isLow ? 'danger' : 'success'}">${isLow ? '偏低' : '正常'}</span></td>
            <td>¥${m.price}</td>
            <td>${m.supplier}</td>
            <td>${m.expiry}</td>
            <td>
              <button class="btn btn-sm btn-ghost" onclick="App.openModal('restock-material', '${m.id}')">补货</button>
            </td>
          </tr>`}).join('')}
        </tbody>
      </table>
    </div>`;
  },

  // ===========================
  // 7. 设备管理 Equipment
  // ===========================
  equipment() {
    const alerts = DATA.equipment.filter(e => e.status !== '正常运行');
    return `
    ${alerts.length > 0 ? `
    <div class="alert alert-warning">
      <span>⚠️</span>
      <span><strong>${alerts.length} 台设备状态异常</strong>：${alerts.map(e => `${e.name}(${e.status})`).join('、')}，请安排检修。</span>
    </div>` : `
    <div class="alert alert-success">
      <span>✅</span>
      <span>所有设备运行正常，无异常告警。</span>
    </div>`}

    <div class="stat-grid fade-in">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(46,125,50,0.1);color:#2e7d32">⚙️</div>
        <div class="stat-value">${DATA.equipment.length}</div>
        <div class="stat-label">设备总数</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(67,160,71,0.1);color:#43a047">✅</div>
        <div class="stat-value">${DATA.equipment.filter(e => e.status === '正常运行').length}</div>
        <div class="stat-label">正常运行</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(229,57,53,0.1);color:#e53935">🔧</div>
        <div class="stat-value">${alerts.length}</div>
        <div class="stat-label">异常设备</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(30,136,229,0.1);color:#1e88e5">📊</div>
        <div class="stat-value">${(DATA.equipment.reduce((s,e) => s + e.usageHours, 0) / 1000).toFixed(1)}k</div>
        <div class="stat-label">总运行时长(h)</div>
      </div>
    </div>

    <div class="filter-bar fade-in">
      <div class="search-input">
        <span class="search-icon">🔍</span>
        <input class="form-input" placeholder="搜索设备名称..." id="eq-search" oninput="App.filterEquipment()">
      </div>
      <select class="form-select" id="eq-status-filter" onchange="App.filterEquipment()">
        <option value="">全部状态</option>
        <option>正常运行</option><option value="abnormal">异常</option>
      </select>
      <div style="flex:1"></div>
      <button class="btn btn-primary" onclick="App.openModal('add-equipment')">+ 新增设备</button>
    </div>

    <div class="widget-grid fade-in equip-grid" style="grid-template-columns:repeat(auto-fill,minmax(340px,1fr))">
      ${DATA.equipment.map(eq => {
        const isOk = eq.status === '正常运行';
        return `
        <div class="card" style="border-left:4px solid ${isOk ? 'var(--success)' : 'var(--danger)'}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div>
              <h4 style="font-size:15px;font-weight:700">${eq.name}</h4>
              <p style="font-size:12px;color:var(--text-muted)">${eq.model} · ${eq.brand}</p>
            </div>
            <span class="badge badge-${isOk ? 'success' : 'danger'}">${eq.status}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px">
            <div><span style="color:var(--text-muted)">📍 位置：</span>${eq.location}</div>
            <div><span style="color:var(--text-muted)">⏱️ 运行：</span>${eq.usageHours}h</div>
            <div><span style="color:var(--text-muted)">🔧 上次维护：</span>${eq.lastMaintenance}</div>
            <div><span style="color:var(--text-muted)">📋 下次维护：</span>${eq.nextMaintenance}</div>
          </div>
          <div style="margin-top:12px;display:flex;gap:8px">
            <button class="btn btn-sm btn-outline" onclick="App.openModal('maintain-equipment','${eq.id}')">维护记录</button>
            ${!isOk ? `<button class="btn btn-sm btn-danger" onclick="App.reportEquipment('${eq.id}')">报修</button>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`;
  },

  // ===========================
  // 8. 库存管理 Inventory
  // ===========================
  inventory() {
    const inCount = DATA.inventoryLogs.filter(l => l.type === '入库').length;
    const outCount = DATA.inventoryLogs.filter(l => l.type === '出库').length;
    return `
    <div class="stat-grid fade-in">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(67,160,71,0.1);color:#43a047">📥</div>
        <div class="stat-value">${inCount}</div>
        <div class="stat-label">入库次数</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(229,57,53,0.1);color:#e53935">📤</div>
        <div class="stat-value">${outCount}</div>
        <div class="stat-label">出库次数</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(30,136,229,0.1);color:#1e88e5">📅</div>
        <div class="stat-value">${DATA.inventoryLogs.length}</div>
        <div class="stat-label">总记录数</div>
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <div class="card-title"><span class="icon-dot"></span> 库存出入库统计</div>
      </div>
      <div class="chart-container"><canvas id="chartInventory"></canvas></div>
    </div>

    <div style="margin-top:24px">
      <div class="filter-bar">
        <select class="form-select" id="inv-type-filter" onchange="App.filterInventory()">
          <option value="">全部类型</option>
          <option value="入库">入库</option><option value="出库">出库</option>
        </select>
        <div style="flex:1"></div>
        <button class="btn btn-primary" onclick="App.openModal('add-inventory-in')">📥 入库登记</button>
        <button class="btn btn-accent" onclick="App.openModal('add-inventory-out')">📤 出库登记</button>
      </div>
      <div class="table-wrapper">
        <table class="data-table" id="inventory-table">
          <thead><tr><th>编号</th><th>类型</th><th>物料名称</th><th>数量</th><th>日期</th><th>操作人</th><th>备注</th></tr></thead>
          <tbody>
            ${DATA.inventoryLogs.map(l => `
            <tr>
              <td>${l.id}</td>
              <td><span class="badge badge-${l.type==='入库'?'success':'danger'}">${l.type==='入库'?'📥 入库':'📤 出库'}</span></td>
              <td><strong>${l.materialName}</strong></td>
              <td>${l.quantity} ${l.unit}</td>
              <td>${l.date}</td>
              <td>${l.operator}</td>
              <td style="color:var(--text-secondary)">${l.remark}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  },

  // ===========================
  // 9. 质检管理 Quality Control
  // ===========================
  quality() {
    const total = DATA.qualityRecords.length;
    const passed = DATA.qualityRecords.filter(q => q.status !== '不合格').length;
    const passRate = ((passed / total) * 100).toFixed(1);
    const excellent = DATA.qualityRecords.filter(q => q.status === '优秀').length;

    return `
    <!-- 质量仪表盘 -->
    <div class="widget-grid fade-in">
      <div class="card" style="display:flex;align-items:center;justify-content:center">
        <div class="quality-gauge">
          <div class="gauge-ring">
            <div class="gauge-inner">${passRate}%</div>
          </div>
          <div class="gauge-label">综合合格率 (${passed}/${total})</div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 质量趋势</div>
        </div>
        <div class="chart-container"><canvas id="chartQuality"></canvas></div>
      </div>
    </div>

    <div class="stat-grid fade-in">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(67,160,71,0.1);color:#43a047">✅</div>
        <div class="stat-value">${passed}</div>
        <div class="stat-label">合格项</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(255,143,0,0.1);color:#ff8f00">⭐</div>
        <div class="stat-value">${excellent}</div>
        <div class="stat-label">优秀项</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(46,125,50,0.1);color:#2e7d32">🎯</div>
        <div class="stat-value">${DATA.config.survivalTarget}%</div>
        <div class="stat-label">成活率目标</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(30,136,229,0.1);color:#1e88e5">📊</div>
        <div class="stat-value">${total}</div>
        <div class="stat-label">质检总数</div>
      </div>
    </div>

    <div style="margin-top:20px">
      <div class="filter-bar">
        <div class="search-input">
          <span class="search-icon">🔍</span>
          <input class="form-input" placeholder="搜索批次号/检测类型..." id="qc-search" oninput="App.filterQC()">
        </div>
        <select class="form-select" id="qc-status-filter" onchange="App.filterQC()">
          <option value="">全部结果</option>
          <option>优秀</option><option>合格</option><option>不合格</option>
        </select>
        <div style="flex:1"></div>
        <button class="btn btn-primary" onclick="App.openModal('add-qc')">+ 新增质检记录</button>
      </div>
      <div class="table-wrapper">
        <table class="data-table" id="qc-table">
          <thead><tr><th>编号</th><th>批次</th><th>检测日期</th><th>检测类型</th><th>结果</th><th>标准</th><th>判定</th><th>检测人</th><th>备注</th></tr></thead>
          <tbody>
            ${DATA.qualityRecords.map(q => `
            <tr>
              <td>${q.id}</td>
              <td><span class="badge badge-primary">${q.batchId}</span></td>
              <td>${q.testDate}</td>
              <td>${q.testType}</td>
              <td><strong>${q.result}</strong></td>
              <td>${q.standard}</td>
              <td><span class="badge badge-${Utils.getQcBadge(q.status)}">${q.status}</span></td>
              <td>${q.tester}</td>
              <td style="color:var(--text-secondary);max-width:160px;overflow:hidden;text-overflow:ellipsis">${q.notes}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  },

  // ===========================
  // 10. 系统管理 System Settings
  // ===========================
  system() {
    return `
    <div class="tabs">
      <button class="tab-btn active" data-tab="sys-threshold" onclick="App.switchTab(this)">环境阈值设置</button>
      <button class="tab-btn" data-tab="sys-about" onclick="App.switchTab(this)">关于系统</button>
    </div>

    <div id="tab-sys-threshold" class="tab-content active">
      <div class="card fade-in" style="max-width:640px">
        <div class="card-header">
          <div class="card-title"><span class="icon-dot"></span> 培养环境参数阈值</div>
        </div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px">设置藿香组培各阶段环境参数的允许范围和最优值。当监测数据超出阈值时，系统将自动发出告警。</p>
        <div id="threshold-form">
          ${Object.entries(DATA.environment.thresholds).map(([key, th]) => {
            const labels = { temperature: '温度(℃)', humidity: '湿度(%)', light: '光照(lx)', co2: 'CO₂(ppm)', ph: '培养基pH' };
            const icons = { temperature: '🌡️', humidity: '💧', light: '☀️', co2: '🌬️', ph: '🧪' };
            return `
            <div style="margin-bottom:20px;padding:16px;background:var(--bg);border-radius:var(--radius-md)">
              <h4 style="font-size:14px;font-weight:700;margin-bottom:12px">${icons[key]} ${labels[key]}</h4>
              <div class="form-row">
                <div class="form-group"><label class="form-label">最小值</label><input class="form-input" type="number" value="${th.min}" data-key="${key}" data-field="min"></div>
                <div class="form-group"><label class="form-label">最优值</label><input class="form-input" type="number" value="${th.optimal}" data-key="${key}" data-field="optimal"></div>
                <div class="form-group"><label class="form-label">最大值</label><input class="form-input" type="number" value="${th.max}" data-key="${key}" data-field="max"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <button class="btn btn-primary" onclick="App.saveThresholds()">💾 保存设置</button>
      </div>
    </div>

    <div id="tab-sys-about" class="tab-content">
      <div class="widget-grid-2">
        <div class="card fade-in">
          <div class="card-header">
            <div class="card-title"><span class="icon-dot"></span> 系统信息</div>
          </div>
          <div style="padding:8px 0">
            ${[
              ['系统名称', '无菌组培苗数字化管理系统'],
              ['版本', 'v3.0'],
              ['种植品种', '藿香 (Agastache rugosa)'],
              ['项目基地', '广东省佛山市高明区梧桐村'],
              ['技术架构', 'HTML5 + CSS3 + JavaScript + Chart.js'],
              ['数据存储', '本地浏览器存储'],
              ['成活率目标', '≥ 90%'],
            ].map(([k,v]) => `<div style="display:flex;margin-bottom:14px"><div style="width:90px;flex-shrink:0;font-weight:600;color:var(--text-secondary);font-size:13px">${k}</div><div style="font-size:13px">${v}</div></div>`).join('')}
          </div>
        </div>
        <div class="card fade-in">
          <div class="card-header">
            <div class="card-title"><span class="icon-dot"></span> 项目介绍</div>
          </div>
          <p style="font-size:13px;line-height:1.8;color:var(--text-secondary)">
            本系统是佛山高明区梧桐村乡村振兴重点项目的数字化管控平台，依托现代植物组织培养技术，
            实现无菌组培苗的规模化、标准化、数字化生产。系统覆盖从外植体选择到田间移栽的全流程管控，
            通过精准的环境参数调控和严格的质检体系，确保组培苗成活率稳定在90%以上。
          </p>
          <div style="margin-top:16px">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              ${[
                ['📋', '2025-06', '项目启动', '佛山高明区梧桐村立项'],
                ['🌿', '2025-09', '首批育苗', 'HX2026-006批次成功移栽'],
                ['🔬', '2025-11', '工艺优化', '培养基配方定型，成活率突破92%'],
                ['✅', '2026-02', '规模扩产', '累计产出超万株'],
                ['🏆', '2026-04', '质量达标', '成活率稳定≥94%'],
                ['🚀', '2026-Q3', '产业推广', '计划推广至周边村镇'],
              ].map(([icon, date, title, desc]) => `
              <div style="display:flex;gap:12px;align-items:flex-start;padding:12px;background:var(--primary-50);border-radius:var(--radius-sm)">
                <div style="font-size:24px;flex-shrink:0">${icon}</div>
                <div>
                  <div style="font-size:12px;color:var(--text-muted)">${date}</div>
                  <div style="font-size:13px;font-weight:700;color:var(--primary-dark)">${title}</div>
                  <div style="font-size:12px;color:var(--text-secondary)">${desc}</div>
                </div>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },
};
