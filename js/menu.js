
// 문서가 완전히 로드되면 안의 코드 실행행
document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------
  // 메인 페이지 메뉴
  // ------------------------------------------
  const movilItems = document.querySelectorAll(".sou_movil_nav>li");
  // 각 li요소에 클릭 이벤트를 등록
  movilItems.forEach((item) => {
    item.addEventListener("click", () => {
      // 클릭 시 해당 li에 "active" 클래스를 토글 
      item.classList.toggle("active");
    });
  });

  // 첫 번째 li 안의 a 태그에 클릭 이벤트 등록
  document.querySelector(".sou_movil_nav li:first-child a").addEventListener("click", function (e) {
      e.preventDefault(); // 링크 이동 막기
    });
  // sou_movil_bar 열고 닫기 기능 관련 클래스 지정 
  const icon = document.querySelector(".sou_movil_icon");
  const bar = document.querySelector(".sou_movil_bar");
  const close = document.querySelector(".close_icon");

  // 메뉴 열림/닫힘
  icon.addEventListener("click", () => {
    bar.classList.toggle("active");
  });
  close.addEventListener("click", () => {
    bar.classList.toggle("active");
  });

  // ------------------------------------------
  // 서브페이지 메뉴
  // ------------------------------------------
  // 왼쪽 메뉴 항목 전체 선택 (li)
  const menuItems = document.querySelectorAll(".sub_left_menuItem");

  // 오른쪽 콘텐츠 영역 전체 선택 (.page)
  const pages = document.querySelectorAll(".page");

  // + 버튼 전체 선택 (서브메뉴 토글 버튼)
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  // ------------------------------------------
  // [1] + 버튼 클릭 시 서브메뉴 열기/닫기
  // ------------------------------------------
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // 중복이벤트 막기(안할 경우 버튼 토클 활성화 x)
      // 클릭된 버튼의 가장 가까운 메뉴 항목(li)을 찾음
      const parentLi = btn.closest(".has-sub");

      // 해당 메뉴에 submenu-open 클래스를 토글 (열고 닫기)
      if (parentLi) {
        parentLi.classList.toggle("submenu-open");
      }
    });
  });

  // -------------------------------
  // [2] 서브메뉴가 있는 li 클릭 시 : 서브메뉴 열고 닫기
  // (단, 서브메뉴 내부 항목 클릭은 예외로 처리)
  // -------------------------------
  document.querySelectorAll(".has-sub").forEach((item) => {
    item.addEventListener("click", (e) => {
      // ✅ 서브 메뉴 항목을 클릭한 경우는 무시 (닫히지 않도록)
      if (e.target.closest(".subMenu-item")) {
        return; // 클릭 무시하고 종료
      }

      // 서브메뉴 토글
      item.classList.toggle("submenu-open");

      // 모든 메뉴에서 selected 제거
      menuItems.forEach((i) => i.classList.remove("selected"));

      // 현재 메뉴에 selected 클래스 추가
      item.classList.add("selected");
    });
  });

  // -------------------------------
  // [3] 왼쪽 메뉴 항목 클릭 시 → 오른쪽 콘텐츠 보여주기 + 제목과 경로도 같이 바꾸기
  // -------------------------------
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      // data-target 속성에서 콘텐츠 ID 가져오기
      const targetId = item.getAttribute("data-target");
      if (!targetId) return; //data-target 이 없으면 종료

      //모든 메뉴에서 selected 클래스 제거
      menuItems.forEach((i) => i.classList.remove("selected"));

      // 현재 클릭된 메뉴 항목에 selected 클래스 추가
      item.classList.add("selected");

      // 모든 콘텐츠 영역에서 active 클래스 제거 (초기화)
      pages.forEach((page) => page.classList.remove("active"));

      // 클릭한 메뉴에 해당하는 콘텐츠만 보여주기
      const targetPage = document.getElementById(targetId);
      if (targetPage) {
        targetPage.classList.add("active");
      }
      // 오른쪽 제목 타이틀과 경로 바꾸기
      // 조건 : .has-sub 메뉴는 .subBox 기준으로 텍스트 변경되기
      let titleText = "";
      if (item.classList.contains("has-sub")) {
        // 서브메뉴가 있는 항목일 경우, subBox 안의 텍스트만 사용
        const box = item.querySelector(".subBox");
        titleText = box ? box.textContent.trim() : ""; // subBox 가 존재하면 추출
      } else {
        titleText = item.textContent.trim();
      }
      // 제목영역(h3)에 텍스트 넣기
      document.querySelector(".subTitleArea h3").textContent = titleText;
      // 경로 영역에서 > 텍스트 변경
      const breadcrumb = document.querySelector(".subLoc a:last-child");
      if (breadcrumb) {
        breadcrumb.textContent = titleText; //텍스트 변경
      }
    });
  });
  // 1100px 메뉴 펼치기
  const toggleBtn = document.querySelector(".toggle_menu");
  const menu = document.querySelector(".sub_left_menu");

  toggleBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-active");
    toggleBtn.textContent = isOpen ? "닫기" : "메뉴 펼치기";
    toggleBtn.setAttribute("aria-expanded", isOpen);
  });
});