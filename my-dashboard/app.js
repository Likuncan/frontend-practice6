// app.js —— 城市天气数据看板
const state = { data: null };

const loadData = async () => {
  $('#status').text('加载中...').show();
  try {
    const response = await fetch('data/weather.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    if (!data.cities || data.cities.length === 0) {
      $('#status').text('暂无数据').show();
      return;
    }
    state.data = data;
    $('#sub-title').text(data.title + ' · 数据来源：' + data.source);
    $('#status').hide();
    renderCards(data);
    // renderBarChart(data);   // 第二步再放开
    // renderLineChart(data);  // 第三步再放开
  } catch (error) {
    $('#status').text('加载失败：' + error.message).show();
  }
};

const renderCards = (data) => {
  const unit = data.unit || '';
  data.cities.forEach(c => {
    const avg = c.temps.reduce((sum, n) => sum + n, 0) / c.temps.length;
    $('#cards').append(`
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title h6">${c.city}</h3>
            <p class="card-text fs-4">${avg.toFixed(1)} ${unit}</p>
            <p class="card-text small text-muted">近${data.dates.length}天平均最高气温</p>
          </div>
        </div>
      </div>
    `);
  });
};

loadData();
