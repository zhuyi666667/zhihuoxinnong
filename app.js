/* ============================================
   无菌组培苗数字化管理系统
   App Logic v3.1 | Routing, Interaction, Charts
   ============================================ */

const App = {
  currentPage: 'dashboard',
  chartInstances: {},

  // ===== 初始化 =====
  init() {
    this.navigate('dashboard');
    this.bindEvents();
    this.showMobileNavHint();
  },

  // ===== 移动端导航提示 =====
  showMobileNavHint() {
    // 仅在手机端且首次访问时显示
    if (window.innerWidth > 768) return;
    if (sessionStorage.getItem('navHintShown')) return;
    const hint = document.createElement('div');
    hint.id = 'mobile-nav-hint';
    hint.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <span style="font-weight:600;font-size:13px;color:#1a1a2e">页面导航</span>
      </div>
      <p style="font-size:12px;color:#5a5a7a;line-height:1.5;margin-bottom:4px">点击下方 <b style="color:#2e7d32">底部导航栏</b> 切换页面，点击 <b style="color:#2e7d32">「更多」</b> 查看全部功能</p>
      <p style="font-size:11px;color:#8a8aa0">左上角 ☰ 按钮也可打开完整菜单</p>
    `;
    Object.assign(hint.style, {
      position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
      background: '#fff', borderRadius: '12px', padding: '14px 18px', maxWidth: '300px', width: 'calc(100% - 40px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: '160',
      opacity: '0', transition: 'opacity 0.3s', pointerEvents: 'none'
    });
    document.body.appendChild(hint);
    requestAnimationFrame(() => { hint.style.opacity = '1'; hint.style.pointerEvents = 'auto'; });
    setTimeout(() => {
      hint.style.opacity = '0';
      hint.style.pointerEvents = 'none';
      setTimeout(() => hint.remove(), 400);
    }, 4500);
    sessionStorage.setItem('navHintShown', '1');
  },

  // ===== 路由导航 =====
  navigate(page) {
    this.currentPage = page;
    // 销毁旧图表
    Object.values(this.chartInstances).forEach(c => c.destroy());
    this.chartInstances = {};

    // 更新侧边栏高亮
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navItem) navItem.classList.add('active');

    // 同步底部 tab 高亮
    document.querySelectorAll('.bottom-nav-item').forEach(n => n.classList.remove('active'));
    const bottomItem = document.querySelector(`.bottom-nav-item[data-page="${page}"]`);
    if (bottomItem) bottomItem.classList.add('active');

    // 渲染页面
    const pageBody = document.getElementById('page-body');
    const pageTitle = document.getElementById('page-title');

    const titles = {
      dashboard: '看板总览',
      seedlings: '种苗档案',
      culture: '培养流程',
      traceability: '全流程溯源',
      environment: '环境监测',
      materials: '物料管理',
      equipment: '设备管理',
      inventory: '库存管理',
      quality: '质检管理',
      system: '系统管理',
    };

    pageTitle.textContent = titles[page] || page;
    pageBody.innerHTML = '';

    switch(page) {
      case 'dashboard': pageBody.innerHTML = Views.dashboard(); this.initDashboardCharts(); break;
      case 'seedlings': pageBody.innerHTML = Views.seedlings(); break;
      case 'culture': pageBody.innerHTML = Views.cultureProcess(); break;
      case 'traceability': pageBody.innerHTML = Views.traceability(); this.initTraceCharts(); break;
      case 'environment': pageBody.innerHTML = Views.environment(); this.initEnvCharts(); break;
      case 'materials': pageBody.innerHTML = Views.materials(); break;
      case 'equipment': pageBody.innerHTML = Views.equipment(); break;
      case 'inventory': pageBody.innerHTML = Views.inventory(); this.initInventoryChart(); break;
      case 'quality': pageBody.innerHTML = Views.quality(); this.initQualityChart(); break;
      case 'system': pageBody.innerHTML = Views.system(); break;
    }

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ===== 事件绑定 =====
  bindEvents() {
    // 侧边栏导航
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        if (page) {
          this.navigate(page);
          // 手机端点完自动收起侧边栏
          if (window.innerWidth <= 768) this.closeSidebar();
        }
      });
    });

    // 底部 Tab 导航
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        if (page === 'more-menu') {
          this.openMoreMenu();
          return;
        }
        if (page) this.navigate(page);
        // 同步底部 tab 高亮
        document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
        item.classList.add('active');
      });
    });

    // ESC关闭弹窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeMoreMenu();
        this.closeSidebar();
      }
    });
  },

  // ===== 侧边栏开关（移动端） =====
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    } else {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    }
  },

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  },

  // ===== 更多菜单（移动端） =====
  openMoreMenu() {
    const overlay = document.getElementById('more-menu-overlay');
    if (overlay) overlay.classList.add('active');
  },

  closeMoreMenu() {
    const overlay = document.getElementById('more-menu-overlay');
    if (overlay) overlay.classList.remove('active');
  },

  // ===== Tab 切换 =====
  switchTab(btn) {
    const tabGroup = btn.closest('.page-body') || document.getElementById('page-body');
    // 更新按钮状态
    btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // 切换内容
    const tabId = btn.dataset.tab;
    tabGroup.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    const target = tabGroup.querySelector(`#tab-${tabId}`);
    if (target) target.classList.add('active');

    // 溯源看板tab需要图表
    if (tabId === 'trace-overview') {
      setTimeout(() => this.initTraceCharts(), 100);
    }
  },

  // ===== Modal =====
  openModal(type, data) {
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    let title = '', body = '';

    switch(type) {
      case 'add-seedling':
        title = '新增种苗档案';
        body = `
        <div class="form-row">
          <div class="form-group"><label class="form-label">批次号</label>
            <select class="form-select" id="m-batch">
              ${DATA.batches.map(b => `<option value="${b.id}">${b.id}</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label class="form-label">来源部位</label>
            <select class="form-select" id="m-source"><option>茎尖</option><option>茎段</option><option>叶片</option></select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">母株编号</label><input class="form-input" id="m-mother" placeholder="例: MH-FS-001"></div>
          <div class="form-group"><label class="form-label">苗高(cm)</label><input class="form-input" type="number" id="m-height" placeholder="0.0"></div>
        </div>
        <div class="form-group"><label class="form-label">备注</label><textarea class="form-textarea" id="m-remark" placeholder="补充说明..."></textarea></div>`;
        break;

      case 'add-material':
        title = '新增物料';
        body = `
        <div class="form-row">
          <div class="form-group"><label class="form-label">物料名称</label><input class="form-input" id="m-mat-name" placeholder="物料名称"></div>
          <div class="form-group"><label class="form-label">分类</label>
            <select class="form-select" id="m-mat-cat"><option>培养基</option><option>激素</option><option>碳源</option><option>凝固剂</option><option>灭菌</option><option>耗材</option><option>基质</option><option>仪器配件</option></select>
          </div>
        </div>
        <div class="form-row-3">
          <div class="form-group"><label class="form-label">单位</label><input class="form-input" id="m-mat-unit" placeholder="L/kg/个"></div>
          <div class="form-group"><label class="form-label">库存量</label><input class="form-input" type="number" id="m-mat-stock"></div>
          <div class="form-group"><label class="form-label">安全库存</label><input class="form-input" type="number" id="m-mat-min"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">单价(¥)</label><input class="form-input" type="number" id="m-mat-price" step="0.01"></div>
          <div class="form-group"><label class="form-label">供应商</label><input class="form-input" id="m-mat-supplier"></div>
        </div>`;
        break;

      case 'restock-material':
        const mat = DATA.materials.find(m => m.id === data);
        title = `物料补货 — ${mat ? mat.name : ''}`;
        body = mat ? `
        <div class="alert alert-info">当前库存: <strong>${mat.stock} ${mat.unit}</strong> · 安全库存: ${mat.minStock} ${mat.unit}</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">补货数量(${mat.unit})</label><input class="form-input" type="number" id="m-restock-qty"></div>
          <div class="form-group"><label class="form-label">补货日期</label><input class="form-input" type="date" id="m-restock-date" value="${Utils.today()}"></div>
        </div>
        <div class="form-group"><label class="form-label">备注</label><textarea class="form-textarea" id="m-restock-remark" placeholder="补货原因..."></textarea></div>` : '';
        break;

      case 'add-equipment':
        title = '新增设备';
        body = `
        <div class="form-row">
          <div class="form-group"><label class="form-label">设备名称</label><input class="form-input" id="m-eq-name"></div>
          <div class="form-group"><label class="form-label">型号</label><input class="form-input" id="m-eq-model"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">位置</label><input class="form-input" id="m-eq-location"></div>
          <div class="form-group"><label class="form-label">品牌</label><input class="form-input" id="m-eq-brand"></div>
        </div>`;
        break;

      case 'maintain-equipment':
        const eq = DATA.equipment.find(e => e.id === data);
        title = `维护记录 — ${eq ? eq.name : ''}`;
        body = eq ? `
        <div class="alert alert-info">上次维护: ${eq.lastMaintenance} · 下次维护: ${eq.nextMaintenance}</div>
        <div class="form-group"><label class="form-label">维护内容</label><textarea class="form-textarea" id="m-maintain-content" placeholder="维护/保养内容..."></textarea></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">维护日期</label><input class="form-input" type="date" id="m-maintain-date" value="${Utils.today()}"></div>
          <div class="form-group"><label class="form-label">维护人</label><input class="form-input" id="m-maintain-op"></div>
        </div>` : '';
        break;

      case 'add-inventory-in':
      case 'add-inventory-out':
        const isIn = type === 'add-inventory-in';
        title = isIn ? '入库登记' : '出库登记';
        body = `
        <div class="form-row">
          <div class="form-group"><label class="form-label">物料</label>
            <select class="form-select" id="m-inv-material">
              ${DATA.materials.map(m => `<option value="${m.name}" data-unit="${m.unit}">${m.name} (库存:${m.stock}${m.unit})</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label class="form-label">数量</label><input class="form-input" type="number" id="m-inv-qty"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">日期</label><input class="form-input" type="date" id="m-inv-date" value="${Utils.today()}"></div>
          <div class="form-group"><label class="form-label">操作人</label><input class="form-input" id="m-inv-op"></div>
        </div>
        <div class="form-group"><label class="form-label">备注</label><textarea class="form-textarea" id="m-inv-remark"></textarea></div>`;
        break;

      case 'add-qc':
        title = '新增质检记录';
        body = `
        <div class="form-row">
          <div class="form-group"><label class="form-label">批次号</label>
            <select class="form-select" id="m-qc-batch">
              ${DATA.batches.map(b => `<option value="${b.id}">${b.id} (${b.stage})</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label class="form-label">检测日期</label><input class="form-input" type="date" id="m-qc-date" value="${Utils.today()}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">检测类型</label>
            <select class="form-select" id="m-qc-type"><option>成活率检测</option><option>污染率检测</option><option>增殖系数检测</option><option>形态学检测</option><option>生根诱导检测</option><option>炼苗适应性评估</option></select>
          </div>
          <div class="form-group"><label class="form-label">检测结果</label><input class="form-input" id="m-qc-result" placeholder="例: 94.4%"></div>
        </div>
        <div class="form-group"><label class="form-label">备注</label><textarea class="form-textarea" id="m-qc-notes"></textarea></div>`;
        break;

      case 'seedling-detail':
        const seedling = DATA.seedlings.find(s => s.id === data);
        title = `种苗详情 — ${data}`;
        body = seedling ? `
        <div class="widget-grid-2">
          <div>
            ${[['编号', seedling.id], ['批次', seedling.batchId], ['来源', seedling.source], ['母株', seedling.motherPlant],
              ['阶段', seedling.stage], ['苗高', seedling.height], ['叶片数', seedling.leafCount], ['根系', seedling.rootStatus],
              ['健康状态', seedling.healthStatus], ['培养天数', seedling.days + '天'], ['创建日期', seedling.createDate],
              ['质量评分', seedling.qualityScore + '分']
            ].map(([k,v]) => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-light)"><span style="color:var(--text-secondary)">${k}</span><strong>${v}</strong></div>`).join('')}
          </div>
          <div style="text-align:center">
            <div class="ppt-image-frame"><img src="imgs/embed_p10_1.png" alt="组培苗" style="height:240px;object-fit:cover"><div class="ppt-image-caption">藿香组培苗培养实况</div></div>
          </div>
        </div>` : '<div class="empty-state">未找到该种苗</div>';
        break;

      case 'batch-trace':
        title = `批次溯源 — ${data}`;
        body = Views._renderTrace(data);
        break;
    }

    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    overlay.classList.add('active');
  },

  closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
  },

  // ===== 筛选功能 =====
  filterSeedlings() {
    const search = (document.getElementById('seedling-search')?.value || '').toLowerCase();
    const stage = document.getElementById('seedling-stage-filter')?.value || '';
    const health = document.getElementById('seedling-health-filter')?.value || '';
    const rows = document.querySelectorAll('#seedling-table tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const matchSearch = !search || text.includes(search);
      const matchStage = !stage || text.includes(stage);
      const matchHealth = !health || text.includes(health);
      row.style.display = (matchSearch && matchStage && matchHealth) ? '' : 'none';
    });
  },

  filterMaterials() {
    const search = (document.getElementById('material-search')?.value || '').toLowerCase();
    const cat = document.getElementById('material-cat-filter')?.value || '';
    const stockFilter = document.getElementById('material-stock-filter')?.value || '';
    const rows = document.querySelectorAll('#material-table tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const matchSearch = !search || text.includes(search);
      const matchCat = !cat || text.includes(cat);
      let matchStock = true;
      if (stockFilter === 'low') matchStock = text.includes('偏低');
      if (stockFilter === 'normal') matchStock = text.includes('正常') && !text.includes('偏低');
      row.style.display = (matchSearch && matchCat && matchStock) ? '' : 'none';
    });
  },

  filterEquipment() {
    const search = (document.getElementById('eq-search')?.value || '').toLowerCase();
    const status = document.getElementById('eq-status-filter')?.value || '';
    const cards = document.querySelectorAll('#page-body .widget-grid .card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const matchSearch = !search || text.includes(search);
      let matchStatus = true;
      if (status === 'abnormal') matchStatus = !text.includes('正常运行');
      card.style.display = (matchSearch && matchStatus) ? '' : 'none';
    });
  },

  filterInventory() {
    const type = document.getElementById('inv-type-filter')?.value || '';
    const rows = document.querySelectorAll('#inventory-table tbody tr');
    rows.forEach(row => {
      const text = row.textContent;
      const matchType = !type || text.includes(type);
      row.style.display = matchType ? '' : 'none';
    });
  },

  filterQC() {
    const search = (document.getElementById('qc-search')?.value || '').toLowerCase();
    const status = document.getElementById('qc-status-filter')?.value || '';
    const rows = document.querySelectorAll('#qc-table tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const matchSearch = !search || text.includes(search);
      const matchStatus = !status || text.includes(status);
      row.style.display = (matchSearch && matchStatus) ? '' : 'none';
    });
  },

  // ===== 溯源功能 =====
  loadTrace(batchId) {
    const container = document.getElementById('trace-content');
    if (container) {
      container.innerHTML = Views._renderTrace(batchId);
      container.classList.add('fade-in');
    }
  },

  generateQR() {
    const batchId = document.getElementById('trace-batch-select')?.value;
    if (!batchId) return;
    this.openModal('batch-trace', batchId);
  },

  viewBatchTrace(batchId) {
    this.navigate('traceability');
    setTimeout(() => {
      const sel = document.getElementById('trace-batch-select');
      if (sel) { sel.value = batchId; this.loadTrace(batchId); }
    }, 100);
  },

  viewSeedling(id) {
    this.openModal('seedling-detail', id);
  },

  // ===== 系统设置 =====
  saveThresholds() {
    const inputs = document.querySelectorAll('#threshold-form input');
    inputs.forEach(input => {
      const key = input.dataset.key;
      const field = input.dataset.field;
      if (key && field && DATA.environment.thresholds[key]) {
        DATA.environment.thresholds[key][field] = parseFloat(input.value);
      }
    });
    this.showToast('环境阈值设置已保存！', 'success');
  },

  // ===== Toast通知 =====
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;min-width:280px;animation:fadeIn 0.3s ease;box-shadow:var(--shadow-lg)';
    const icons = { success: '✅', info: 'ℹ️', warning: '⚠️', danger: '❌' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
  },

  // ===== 图表：看板 =====
  initDashboardCharts() {
    const ms = DATA.monthlyStats;
    const labels = ms.months.map(m => m.slice(5));

    // 生产趋势
    const ctx1 = document.getElementById('chartProduction');
    if (ctx1) {
      this.chartInstances.production = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: '培养量(瓶)', data: ms.production, backgroundColor: 'rgba(46,125,50,0.7)', borderRadius: 6, barPercentage: 0.5 },
            { label: '产出(株)', data: ms.outputCount, backgroundColor: 'rgba(255,143,0,0.7)', borderRadius: 6, barPercentage: 0.5 }
          ]
        },
        options: this._chartOpts('月度生产数据')
      });
    }

    // 成活率 & 污染率
    const ctx2 = document.getElementById('chartRates');
    if (ctx2) {
      this.chartInstances.rates = new Chart(ctx2, {
        type: 'line',
        data: {
          labels,
          datasets: [
            { label: '成活率(%)', data: ms.survivalRate, borderColor: '#43a047', backgroundColor: 'rgba(67,160,71,0.1)', fill: true, tension: 0.4, pointRadius: 4 },
            { label: '污染率(%)', data: ms.contaminationRate, borderColor: '#e53935', backgroundColor: 'rgba(229,57,53,0.1)', fill: true, tension: 0.4, pointRadius: 4 }
          ]
        },
        options: this._chartOpts('质量指标走势')
      });
    }
  },

  // ===== 图表：溯源 =====
  initTraceCharts() {
    const ctx1 = document.getElementById('chartStageDist');
    if (ctx1) {
      const stageCounts = DATA.stages.map(s => DATA.batches.filter(b => b.stage === s.name).length);
      this.chartInstances.stageDist = new Chart(ctx1, {
        type: 'doughnut',
        data: {
          labels: DATA.stages.map(s => s.name),
          datasets: [{ data: stageCounts, backgroundColor: ['#2e7d32','#43a047','#66bb6a','#ff8f00','#f9a825','#1e88e5'], borderWidth: 2, borderColor: '#fff' }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 16 } } }
        }
      });
    }

    const ctx2 = document.getElementById('chartCycleTime');
    if (ctx2) {
      this.chartInstances.cycleTime = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: DATA.batches.slice(0, 5).map(b => b.id),
          datasets: [{
            label: '培养天数',
            data: DATA.batches.slice(0, 5).map(b => {
              const start = new Date(b.startDate);
              const now = b.status === '已完成' ? new Date('2026-04-16') : new Date();
              return Math.floor((now - start) / 86400000);
            }),
            backgroundColor: ['rgba(46,125,50,0.7)','rgba(67,160,71,0.7)','rgba(255,143,0,0.7)','rgba(30,136,229,0.7)','rgba(156,39,176,0.7)'],
            borderRadius: 6, barPercentage: 0.5
          }]
        },
        options: this._chartOpts('批次培养周期')
      });
    }
  },

  // ===== 图表：环境监测 =====
  initEnvCharts() {
    const hourly = DATA.environment.hourly;
    const labels = hourly.map(h => h.hour);

    const ctx1 = document.getElementById('chartEnvTemp');
    if (ctx1) {
      this.chartInstances.envTemp = new Chart(ctx1, {
        type: 'line',
        data: {
          labels,
          datasets: [
            { label: '温度(℃)', data: hourly.map(h => h.temperature), borderColor: '#e53935', backgroundColor: 'rgba(229,57,53,0.08)', fill: true, tension: 0.3, pointRadius: 2 },
            { label: '湿度(%)', data: hourly.map(h => h.humidity), borderColor: '#1e88e5', backgroundColor: 'rgba(30,136,229,0.08)', fill: true, tension: 0.3, pointRadius: 2, yAxisID: 'y1' }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          scales: {
            y: { title: { display: true, text: '温度(℃)' }, grid: { color: 'rgba(0,0,0,0.05)' } },
            y1: { position: 'right', title: { display: true, text: '湿度(%)' }, grid: { drawOnChartArea: false } }
          },
          plugins: { legend: { position: 'top', labels: { font: { size: 12 }, padding: 16 } } }
        }
      });
    }

    const ctx2 = document.getElementById('chartEnvLight');
    if (ctx2) {
      this.chartInstances.envLight = new Chart(ctx2, {
        type: 'line',
        data: {
          labels,
          datasets: [
            { label: '光照(lx)', data: hourly.map(h => h.light), borderColor: '#ff8f00', backgroundColor: 'rgba(255,143,0,0.08)', fill: true, tension: 0.3, pointRadius: 2 },
            { label: 'CO₂(ppm)', data: hourly.map(h => h.co2), borderColor: '#7b1fa2', backgroundColor: 'rgba(123,31,162,0.08)', fill: true, tension: 0.3, pointRadius: 2, yAxisID: 'y1' }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          scales: {
            y: { title: { display: true, text: '光照(lx)' }, grid: { color: 'rgba(0,0,0,0.05)' } },
            y1: { position: 'right', title: { display: true, text: 'CO₂(ppm)' }, grid: { drawOnChartArea: false } }
          },
          plugins: { legend: { position: 'top', labels: { font: { size: 12 }, padding: 16 } } }
        }
      });
    }
  },

  // ===== 图表：库存 =====
  initInventoryChart() {
    const ctx = document.getElementById('chartInventory');
    if (!ctx) return;
    // 按物料分组统计出入库
    const matMap = {};
    DATA.inventoryLogs.forEach(l => {
      if (!matMap[l.materialName]) matMap[l.materialName] = { in: 0, out: 0 };
      if (l.type === '入库') matMap[l.materialName].in += l.quantity;
      else matMap[l.materialName].out += l.quantity;
    });
    const names = Object.keys(matMap).slice(0, 8);
    this.chartInstances.inventory = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: names.map(n => n.length > 8 ? n.slice(0, 8) + '…' : n),
        datasets: [
          { label: '入库', data: names.map(n => matMap[n].in), backgroundColor: 'rgba(67,160,71,0.7)', borderRadius: 4 },
          { label: '出库', data: names.map(n => matMap[n].out), backgroundColor: 'rgba(229,57,53,0.7)', borderRadius: 4 }
        ]
      },
      options: this._chartOpts('物料出入库统计')
    });
  },

  // ===== 图表：质检 =====
  initQualityChart() {
    const ctx = document.getElementById('chartQuality');
    if (!ctx) return;
    const qt = DATA.qualityTrend;
    this.chartInstances.quality = new Chart(ctx, {
      type: 'line',
      data: {
        labels: qt.weeks,
        datasets: [
          { label: '成活率(%)', data: qt.survival, borderColor: '#43a047', backgroundColor: 'rgba(67,160,71,0.1)', fill: true, tension: 0.4, pointRadius: 3 },
          { label: '污染率(%)', data: qt.contamination, borderColor: '#e53935', backgroundColor: 'rgba(229,57,53,0.1)', fill: true, tension: 0.4, pointRadius: 3 },
          { label: '增殖倍率', data: qt.growthRate, borderColor: '#1e88e5', tension: 0.4, pointRadius: 3, borderDash: [5, 5] }
        ]
      },
      options: this._chartOpts('12周质量趋势')
    });
  },

  // ===== 图表通用配置 =====
  _chartOpts(title) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { font: { size: 12 }, padding: 16, usePointStyle: true, pointStyleWidth: 8 } },
        title: { display: !!title, text: title, font: { size: 14, weight: 'bold' }, padding: { bottom: 16 } }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
        x: { grid: { display: false } }
      }
    };
  },
};

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', () => App.init());
