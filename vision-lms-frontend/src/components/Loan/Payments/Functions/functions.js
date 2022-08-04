function roundOff(x) {
  return (
    Number(x.toString().split(".")[1]) > 0
      ? Number(x.toString().split(".")[0]) + 1
      : Number(x.toString().split(".")[0]) + 0
  ).toString();
}

function renderDays(d_one, d_two) {
  if (!d_one && !d_two) return 1;
  d_one =
    d_one?.split("-")[2] +
    "/" +
    (Number(d_one?.split("-")[1]) + 1).toString() +
    "/" +
    d_one?.split("-")[0];
  d_two =
    d_two?.split("-")[2] +
    "/" +
    (Number(d_two?.split("-")[1]) + 1).toString() +
    "/" +
    d_two?.split("-")[0];
  let date_one = new Date(`${d_one}`);
  let date_two = new Date(`${d_two}`);

  let diff = date_two.getTime() - date_one.getTime();
  let days = Math.ceil(diff / (1000 * 3600 * 24));

  return days;
}

function renderDateDistribution(cycle, sub_prev, sub_date, work_int) {
  let result = 0;
  let day = sub_date.split("-")[0];
  let month = sub_date.split("-")[1];
  let year = sub_date.split("-")[2];
  const date = new Date(year, month, day);
  date.setDate(date.getDate());
  let day_num = date.getDay();

  let day_prev = sub_prev.split("-")[0];
  let month_prev = sub_prev.split("-")[1];
  let year_prev = sub_prev.split("-")[2];
  const date_prev = new Date(year_prev, month_prev, day_prev);
  date_prev.setDate(date_prev.getDate());
  let day_num_prev = date_prev.getDay();

  if (day_num === day_num_prev) result = day_num - day_num_prev;
  if (day_num > day_num_prev) result = day_num - day_num_prev;
  if (day_num < day_num_prev) result = day_num + day_num_prev;
  day_num = result;

  if (cycle === "weeks")
    result = Number(Number(work_int) / 6) * Number(day_num);
  if (cycle === "months") result = Number(Number(work_int) / 30) * Number(day);

  result = Number(roundOff(result));
  return result;
}

export function renderPayments(
  sundays,
  interest,
  tenure,
  installment,
  balance,
  amount,
  waiver,
  penalty,
  os_penalty,
  prev_penalty,
  arrears,
  prev_arrears_paid,
  os_interest,
  prev_interest_paid,
  os_principal,
  prev_principal_paid,
  cycle,
  status,
  payment,
  current,
  previous,
  next,
  count,
  counter,
  prev_face_os_arr,
  prev_face_pd_arr,
  prev_face_os_pen,
  prev_face_pd_pen,
  prev_face_os_int,
  prev_face_pd_int,
  prev_face_os_pri,
  prev_face_pd_pri,
  prev_face_os_bal
) {
  const data = [
    { name: "sundays", value: sundays },
    { name: "interest", value: interest },
    { name: "tenure", value: tenure },
    { name: "installment", value: installment },
    { name: "balance", value: balance },
    { name: "amount", value: amount },
    { name: "waiver", value: waiver },
    { name: "penalty", value: penalty },
    { name: "os_penalty", value: os_penalty },
    { name: "prev_penalty", value: prev_penalty },
    { name: "arrears", value: arrears },
    { name: "prev_arrears_paid", value: prev_arrears_paid },
    { name: "os_interest", value: os_interest },
    { name: "prev_interest_paid", value: prev_interest_paid },
    { name: "os_principal", value: os_principal },
    { name: "prev_principal_paid", value: prev_principal_paid },
    { name: "cycle", value: cycle },
    { name: "status", value: status },
    { name: "payment", value: payment },
    { name: "current", value: current },
    { name: "previous", value: previous },
    { name: "next", value: next },
    { name: "count", value: count },
    { name: "counter", value: counter },
    { name: "prev_face_os_arr", value: prev_face_os_arr },
    { name: "prev_face_pd_arr", value: prev_face_pd_arr },
    { name: "prev_face_os_pen", value: prev_face_os_pen },
    { name: "prev_face_pd_pen", value: prev_face_pd_pen },
    { name: "prev_face_os_int", value: prev_face_os_int },
    { name: "prev_face_pd_int", value: prev_face_pd_int },
    { name: "prev_face_os_pri", value: prev_face_os_pri },
    { name: "prev_face_pd_pri", value: prev_face_pd_pri },
    { name: "prev_face_os_bal", value: prev_face_os_bal },
  ];
  console.group("Render Payments");
  const result = [];
  let res_next = next
    ? renderResNext(next, cycle, count, sundays)[0]
    : renderResNext("", "", "", "");
  let state = {
    previous: status,
    present: payment,
    function: "",
    payment_count: count,
    payment_counter: counter,
  };

  let face_os_arrears = prev_face_os_arr;
  let face_pd_arrears = prev_face_pd_arr;
  let face_os_penalty = prev_face_os_pen;
  let face_pd_penalty = prev_face_pd_pen;
  let face_os_interest = prev_face_os_int;
  let face_pd_interest = prev_face_pd_int;
  let face_os_principal = prev_face_os_pri;
  let face_pd_principal = prev_face_pd_pri;
  let face_os_balance = prev_face_os_bal;

  let first = res_next?.res_next_first;
  let second = res_next?.res_next_second;
  let third = res_next?.res_next_third;
  let fourth = res_next?.res_next_fourth;

  // second = second?.split("-")[0] === "32" ? "01" + "-" + ((Number(second?.split("-")[1]) + 1) > 9 ? (Number(second?.split("-")[1]) + 1) : "0" + (Number(second?.split("-")[1]) + 1)).toString() + "-" + second?.split("-")[2] : second;

  let current_arrears = 0;
  let outstanding_balance = 0;
  let outstanding_penalty = 0;
  let outstanding_principal = 0;
  let outstanding_interest = 0;
  let arrears_paid = 0;
  let principal_paid = 0;
  let penalty_paid = 0;
  let current_penalty = 0;
  let interest_paid = 0;
  let check_interest = Number(roundOff(interest / tenure));
  let check_principal = installment - check_interest;

  const params = [
    { name: "payment_sts", value: state.previous },
    { name: "payment_day_1", value: state.present },
    { name: "payment_cnt", value: count },
    { name: "arrears_crt", value: arrears },
    { name: "bos_balance", value: balance },
    { name: "current", value: current },
    { name: "next", value: next },
    { name: "previous", value: previous },
    { name: "counter", value: counter },
    { name: "prev_face_os_arr", value: prev_face_os_arr },
    { name: "prev_face_pd_arr", value: prev_face_pd_arr },
    { name: "prev_face_os_pen", value: prev_face_os_pen },
    { name: "prev_face_pd_pen", value: prev_face_pd_pen },
    { name: "prev_face_os_int", value: prev_face_os_int },
    { name: "prev_face_pd_int", value: prev_face_pd_int },
    { name: "prev_face_os_pri", value: prev_face_os_pri },
    { name: "prev_face_pd_pri", value: prev_face_pd_pri },
    { name: "prev_face_os_bal", value: prev_face_os_bal },
  ];

  count = count === "zero" ? 0 : count;
  state.payment_count =
    state.present === "previous"
      ? `${Number(count) + 1}`
      : `${Number(count) + 0}`;

  counter = counter === "zero" ? Number(tenure) : counter;
  state.payment_counter =
    state.present === "previous"
      ? `${Number(counter) - 1}`
      : `${Number(counter) + 0}`;

  console.groupCollapsed("Params");
  console.table(data);
  // console.table(params);
  console.groupEnd();

  // console.groupCollapsed("Next");
  // console.table(res_next);
  // console.groupEnd();

  let working_res = 0;
  let working_amt = 0;
  let working_arr = 0;
  let working_pen = 0;
  let working_int = 0;
  let working_pri = 0;
  let working_bal = 0;
  let diff = renderDays(previous, current);
  diff = diff > 0 ? diff : 1;
  diff =
    cycle === "days"
      ? diff
      : Number((Number(diff) / 7).toString().split(".")[0]);
  diff += 1;
  console.log("Prev :", previous);
  console.log("Curr :", current);
  console.log("Ovpd :", prev_principal_paid);

  function renderDefault(
    balance_due,
    penalty_due,
    interest_due,
    principal_due,
    arrears_due,
    pay_cycle
  ) {
    working_res = prev_face_os_int + interest_due;
    working_amt = amount;

    face_os_arrears =
      prev_face_os_arr + prev_face_os_int + prev_face_os_pri - amount;
    face_os_arrears = face_os_arrears > 0 ? face_os_arrears : 0;
    face_pd_arrears =
      amount > prev_face_os_int + prev_face_os_pri
        ? prev_face_os_int + prev_face_os_pri
        : prev_face_pd_arr + amount;

    (working_amt > working_res && (face_os_interest = 0)) ||
      (face_os_interest = working_res - working_amt);
    (working_amt > working_res &&
      (face_pd_interest = prev_face_pd_int + working_res)) ||
      (face_pd_interest = prev_face_pd_int + working_amt);
    outstanding_penalty = penalty_due + os_penalty;
    face_os_penalty = outstanding_penalty;

    if (state.previous !== "zero" && prev_face_os_bal === 0) {
      amount = waiver > 0 ? Number(amount) + Number(waiver) : amount;
      face_os_arrears = prev_face_os_pen - amount;
      face_os_penalty -= amount;
    }

    if (state.present === "before") {
      (working_res > 0 &&
        (face_pd_interest = prev_face_pd_int + working_amt)) ||
        (face_pd_interest = prev_face_pd_int);
    }

    working_amt = amount - working_res;
    working_res = prev_face_os_pri + principal_due;

    (working_amt > working_res && (face_os_principal = 0)) ||
      (face_os_principal =
        face_os_interest > 0 ? working_res : working_res - working_amt);
    (working_amt > working_res &&
      (face_pd_principal = prev_face_pd_pri + working_res)) ||
      (face_pd_principal = prev_face_pd_pri + working_amt);

    principal_paid = working_amt - working_res;
    principal_paid = principal_paid > 0 ? principal_paid : 0;

    face_os_balance = balance_due + interest_due - amount;

    if (amount > prev_face_os_bal) {
      if (waiver > 0) amount = waiver;
      state.function += "0";
      working_amt = amount;
      let working_res_one = interest_due;
      let working_res_two = principal_due;
      working_res = working_res_one + working_res_two;
      let working_res_three = working_amt - working_res;
      working_res_three = working_res_three > 0 ? working_res_three : 0;

      face_os_balance = balance_due + interest_due - amount;
      face_os_interest = working_res_one;

      if (prev_face_os_pri > 0 && prev_face_os_bal === 0) {
        state.function += "1";
        face_os_arrears = prev_face_os_arr;
        face_os_penalty = waiver >= os_penalty && 0;
        face_os_principal = prev_face_os_pri;
      }

      if (face_os_interest > 0) {
        state.function += "2";
        face_os_interest = face_os_interest - working_amt;
        face_pd_interest =
          face_os_interest > 0
            ? prev_face_pd_int + working_amt
            : prev_face_pd_int + working_res_one;

        working_amt -= working_res_one;
        face_os_principal =
          face_os_interest > 0
            ? working_res_two
            : working_res_two - working_amt;
        face_pd_principal =
          face_os_interest > 0
            ? prev_face_pd_pri
            : face_os_principal > 0
            ? prev_face_pd_pri + working_amt
            : prev_face_pd_pri + working_res_two;
        principal_paid = working_amt - working_res_two;
        principal_paid = principal_paid > 0 ? principal_paid : 0;
        return;
      }
    }

    if (prev_principal_paid > 0) {
      working_amt = amount;
      let working_res_one = prev_face_os_int + interest_due;
      let working_res_two = prev_face_os_pri + principal_due;
      working_res = working_res_one + working_res_two;
      let working_res_three = working_amt + prev_principal_paid - working_res;
      working_res_three = working_res_three > 0 ? working_res_three : 0;

      face_os_balance = balance_due + interest_due - amount;

      if (prev_principal_paid > working_res) {
        state.function += "1";
        face_os_interest = 0;
        face_pd_interest = prev_face_pd_int + working_res_one;
        face_os_principal = 0;
        face_pd_principal = prev_face_pd_pri + working_res_two + working_amt;

        principal_paid = prev_principal_paid - working_res;
        principal_paid += working_amt;
        principal_paid = principal_paid > 0 ? principal_paid : 0;

        return;
      }

      if (prev_principal_paid > working_res_one) {
        state.function += "2";
        face_os_interest = 0;
        face_pd_interest = prev_face_pd_int + working_res_one;
        prev_principal_paid -= working_res_one;

        face_os_principal = working_res_two - prev_principal_paid;
        face_pd_principal = prev_principal_paid;

        if (face_os_principal > 0) {
          state.function += "0";
          face_os_principal = face_os_principal - working_amt;
          face_pd_principal =
            face_os_principal > 0
              ? face_pd_principal + working_amt
              : working_res_two + working_res_three;
          principal_paid = face_os_principal > 0 ? 0 : working_res_three;
          principal_paid = principal_paid > 0 ? principal_paid : 0;
          return;
        }
        principal_paid = prev_principal_paid - working_res_two;
        principal_paid += working_amt;

        principal_paid = principal_paid > 0 ? principal_paid : 0;
        return;
      }

      face_os_interest = working_res_one - prev_principal_paid;

      if (face_os_interest > 0) {
        state.function += "3";
        face_os_interest = face_os_interest - working_amt;
        face_pd_interest =
          face_os_interest > 0
            ? prev_face_pd_int + prev_principal_paid + working_amt
            : prev_face_pd_int + working_res_one;

        working_amt -= working_res_one - prev_principal_paid;
        face_os_principal =
          face_os_interest > 0
            ? working_res_two
            : working_res_two - working_amt;
        prev_face_pd_pri -= prev_principal_paid;
        face_pd_principal =
          face_os_interest > 0
            ? prev_face_pd_pri
            : face_os_principal > 0
            ? prev_face_pd_pri + working_amt
            : prev_face_pd_pri + working_res_two;
        principal_paid = working_amt - working_res_two - prev_principal_paid;
        principal_paid = principal_paid > 0 ? principal_paid : 0;
        if (amount > prev_face_os_bal) face_os_balance -= prev_principal_paid;
        return;
      }
      return;
    }
    return;
  }

  function renderBeforeFirst() {
    state.function = "1.0";
    state.present = "before";

    working_pen = 0;
    working_int = 0;
    working_pri = 0;
    if (amount > prev_face_os_bal)
      working_int = check_interest * Number(tenure) - prev_face_pd_int;
    if (amount > prev_face_os_bal) working_pri = prev_face_os_bal;
    // if (amount > prev_face_os_bal) working_int = renderDateDistribution(cycle, previous, current, check_interest);
    working_bal = prev_face_os_bal;

    if (prev_face_os_pri > 0) {
      working_pen = penalty;
    }
  }

  function renderDuringFirst() {
    state.function = "1.1";
    state.present = "previous";

    working_pen = 0;
    diff -= 1;
    state.previous === "before" && (diff = 1);
    cycle === "days" && state.previous === "previous" && (diff = 1);
    working_int = check_interest * diff;
    working_pri = check_principal * diff;
    if (amount > prev_face_os_bal)
      working_int = check_interest * Number(tenure) - prev_face_pd_int;
    if (amount > prev_face_os_bal) working_pri = prev_face_os_bal;
    working_bal = prev_face_os_bal;
  }

  function renderBetweenFirstSecond() {
    state.function = "1.2";
    state.present = "between";

    cycle === "days" && (diff -= 1);
    working_pen = penalty;
    working_int = check_interest * diff;
    working_pri = check_principal * diff;
    working_bal = prev_face_os_bal;
  }

  function renderDuringSecond() {
    state.function = "1.3";
    state.present = "next";

    cycle === "days" && (diff -= 1);
    state.previous === "before" && (diff -= 1);
    working_pen = penalty * (Number(diff) - 1);
    working_int = check_interest * diff;
    working_pri = check_principal * diff;
    working_bal = prev_face_os_bal;
  }

  function renderAfterSecond() {
    state.function = "1.4";
    state.present = "after";

    cycle === "days" && (diff -= 1);
    state.previous === "before" && (diff -= 1);
    working_pen = penalty * (Number(diff) - 1);
    working_int = check_interest * diff;
    working_pri = check_principal * diff;
    working_bal = prev_face_os_bal;
  }

  console.log(current)
  console.log(next)
  console.log(first)
  console.log(second)
  console.log(third)
  if (renderDays(current, next) > 0) renderBeforeFirst();
  if (renderDays(current, next) === 0) renderDuringFirst();
  if (renderDays(current, next) < 0 && renderDays(current, second) > 0)
    renderBetweenFirstSecond();
  if (renderDays(current, second) === 0) renderDuringSecond();
  if (renderDays(current, second) < 0) renderAfterSecond();

  renderDefault(
    working_bal,
    working_pen,
    working_int,
    working_pri,
    working_arr,
    cycle
  );

  prev_face_os_bal <= 0 && (outstanding_penalty = prev_face_os_pen - amount);
  prev_face_os_bal <= 0 && (face_pd_penalty = amount);
  prev_face_os_bal <= 0 && (face_pd_arrears = prev_face_pd_arr + amount);
  waiver > 0 && (face_pd_penalty = 0);
  waiver > 0 && (face_pd_arrears = 0);
  waiver > 0 && (principal_paid = 0);

  console.log("Ovpy :", principal_paid);
  console.log("Diff :", diff);
  console.group("State");
  console.table(state);
  console.groupEnd();

  result.push({
    res_arrears: current_arrears < 0 ? "0" : current_arrears.toString(),
    res_arrears_paid: arrears_paid < 0 ? "0" : arrears_paid.toString(),
    res_arrears_os: face_os_arrears < 0 ? "0" : face_os_arrears.toString(),
    res_arrears_pd: face_pd_arrears < 0 ? "0" : face_pd_arrears.toString(),
    res_outstanding_balance:
      outstanding_balance < 0 ? "0" : outstanding_balance.toString(),
    res_outstanding_penalty:
      outstanding_penalty < 0 ? "0" : outstanding_penalty.toString(),
    res_penalty_paid: penalty_paid < 0 ? "0" : penalty_paid.toString(),
    res_penalty_os: face_os_penalty < 0 ? "0" : face_os_penalty.toString(),
    res_penalty_pd: face_pd_penalty < 0 ? "0" : face_pd_penalty.toString(),
    res_current_penalty: current_penalty < 0 ? "0" : current_penalty.toString(),
    res_awarded_penalty: current_penalty > 0 ? true : false,
    res_payment_day: state.present,
    res_payment_count: state.payment_count,
    res_payment_counter: state.payment_counter,
    res_outstanding_interest:
      outstanding_interest < 0 ? "0" : outstanding_interest.toString(),
    res_interest_paid: interest_paid < 0 ? "0" : interest_paid.toString(),
    res_interest_os: face_os_interest < 0 ? "0" : face_os_interest.toString(),
    res_interest_pd: face_pd_interest < 0 ? "0" : face_pd_interest.toString(),
    res_outstanding_principal:
      outstanding_principal < 0 ? "0" : outstanding_principal.toString(),
    res_principal_paid: principal_paid < 0 ? "0" : principal_paid.toString(),
    res_principal_os:
      face_os_principal < 0 ? "0" : face_os_principal.toString(),
    res_principal_pd:
      face_pd_principal < 0 ? "0" : face_pd_principal.toString(),
    res_balance_os: face_os_balance < 0 ? "0" : face_os_balance.toString(),
    res_current_status: state,
  });

  const results = [
    { name: "arrears", value: result[0]?.res_arrears },
    { name: "arr_paid", value: result[0]?.res_arrears_paid },
    { name: "f_arr_os", value: result[0]?.res_arrears_os },
    { name: "f_arr_pd", value: result[0]?.res_arrears_pd },
    { name: "balance", value: result[0]?.res_outstanding_balance },
    { name: "penalty", value: result[0]?.res_outstanding_penalty },
    { name: "paid", value: result[0]?.res_principal_paid },
    { name: "f_pen_os", value: result[0]?.res_penalty_os },
    { name: "f_pen_pd", value: result[0]?.res_penalty_pd },
    { name: "principal", value: result[0]?.res_outstanding_principal },
    { name: "paid", value: result[0]?.res_penalty_paid },
    { name: "penalty", value: result[0]?.res_current_penalty },
    { name: "penalty", value: result[0]?.res_awarded_penalty },
    { name: "day", value: result[0]?.res_payment_day },
    { name: "count", value: result[0]?.res_payment_count },
    { name: "counter", value: result[0]?.res_payment_counter },
    { name: "paid", value: result[0]?.res_interest_paid },
    { name: "interest", value: result[0]?.res_outstanding_interest },
    { name: "f_int_os", value: result[0]?.res_interest_os },
    { name: "f_int_pd", value: result[0]?.res_interest_pd },
    { name: "f_pri_os", value: result[0]?.res_principal_os },
    { name: "f_pri_pd", value: result[0]?.res_principal_pd },
    { name: "f_bal_os", value: result[0]?.res_balance_os },
  ];

  console.groupCollapsed("Results");
  console.table(results);
  console.groupEnd();

  console.groupEnd();
  return result;
}

export function renderDates(first, previous, next) {
  let result = [];
  let today = 0;
  let yesterday = 0;
  let tomorrow = 0;
  let first_day = 0;
  let previous_day = 0;
  let next_day = 0;

  const renderFirstInstallment = (first_date) => {
    let day = first_date.split("-")[0];
    let month = first_date.split("-")[1];
    let year = first_date.split("-")[2];
    const date = new Date(year, Number(month - 0), day);
    date.setDate(date.getDate() + 0);
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate() +
      (Number(date.getMonth() + 1) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    return result;
  };

  let first_installment = renderFirstInstallment(first);

  const renderPreviousInstallment = (previous_date) => {
    let day = previous_date.split("-")[0];
    let month = previous_date.split("-")[1];
    let year = previous_date.split("-")[2];
    const date = new Date(year, Number(month - 0), day);
    date.setDate(date.getDate() + 0);
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate() +
      (Number(date.getMonth() + 1) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    return result;
  };

  let prev_installment = renderPreviousInstallment(previous);

  const renderNextInstallment = (next_date) => {
    let day = next_date.split("-")[0];
    let month = next_date.split("-")[1];
    let year = next_date.split("-")[2];
    const date = new Date(year, Number(month - 0), day);
    date.setDate(date.getDate() + 0);
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate() +
      (Number(date.getMonth() + 1) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    return result;
  };

  let next_installment = renderNextInstallment(next);

  const renderToday = () => {
    const date = new Date();
    today =
      date.getFullYear() +
      "" +
      (Number(date.getMonth()) > 9 ? "" : "0") +
      Number(date.getMonth()) +
      "" +
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate();
    return today;
  };

  const renderTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    tomorrow =
      date.getFullYear() +
      "" +
      (Number(date.getMonth()) > 9 ? "" : "0") +
      Number(date.getMonth()) +
      "" +
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate();
    return tomorrow;
  };

  const renderYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    yesterday =
      date.getFullYear() +
      "" +
      (Number(date.getMonth()) > 9 ? "" : "0") +
      Number(date.getMonth()) +
      "" +
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate();
    return yesterday;
  };

  const renderFirst = (first_date) => {
    let day = first_date.split("-")[0];
    let month = first_date.split("-")[1];
    let year = first_date.split("-")[2];
    const date = new Date(year, month, day);
    first_day =
      date.getFullYear() +
      "" +
      (Number(date.getMonth()) > 9 ? "" : "0") +
      Number(date.getMonth()) +
      "" +
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate();
    return first_day;
  };

  const renderPrevious = (previous_date) => {
    let day = previous_date.split("-")[0];
    let month = previous_date.split("-")[1];
    let year = previous_date.split("-")[2];
    const date = new Date(year, month, day);
    previous_day =
      date.getFullYear() +
      "" +
      (Number(date.getMonth()) > 9 ? "" : "0") +
      Number(date.getMonth()) +
      "" +
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate();
    return previous_day;
  };

  const renderNext = (next_date) => {
    let day = next_date.split("-")[0];
    let month = next_date.split("-")[1];
    let year = next_date.split("-")[2];
    const date = new Date(year, month, day);
    next_day =
      date.getFullYear() +
      "" +
      (Number(date.getMonth()) > 9 ? "" : "0") +
      Number(date.getMonth()) +
      "" +
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate();
    return next_day;
  };

  let todate = renderToday();
  let tomorrate = renderTomorrow();
  let yesterdate = renderYesterday();
  let firstate = renderFirst(first);
  let prevate = renderPrevious(previous);
  let nextate = renderNext(next);

  result.push({
    res_today: todate,
    res_tomorrow: tomorrate,
    res_yesterday: yesterdate,
    res_first: firstate,
    res_previous: prevate,
    res_next: nextate,
    res_first_installment: first_installment,
    res_prev_installment: prev_installment,
    res_next_installment: next_installment,
  });

  return result;
}

export function renderCurrentDate(current_date) {
  let day = current_date.split("-")[2];
  let month = current_date.split("-")[1];
  let year = current_date.split("-")[0];
  const date = new Date(year, month, day);
  let current_day =
    date.getFullYear() +
    "" +
    (Number(date.getMonth() - 1) > 9 ? "" : "0") +
    Number(date.getMonth() - 1) +
    "" +
    (Number(date.getDate()) > 9 ? "" : "0") +
    date.getDate();
  return current_day;
}

export function renderFirstInstallmentDate(installment_date) {
  let day = installment_date.split("-")[0];
  let month = installment_date.split("-")[1];
  let year = installment_date.split("-")[2];
  const date = new Date(year, month, day);
  date.setDate(date.getDate());
  let result =
    (Number(date.getDate()) > 9 ? "" : "0") +
    date.getDate() +
    (Number(date.getMonth() + 0) > 9 ? "-" : "-0") +
    Number(date.getMonth() + 0) +
    "-" +
    date.getFullYear();
  return result.toString();
}

export function renderCurrentInstallmentDate(installment_date) {
  let day = installment_date.split("-")[2];
  let month = installment_date.split("-")[1];
  let year = installment_date.split("-")[0];
  const date = new Date(year, (Number(month) - 1).toString(), day);
  date.setDate(date.getDate());
  let result =
    (Number(date.getDate()) > 9 ? "" : "0") +
    date.getDate() +
    (Number(date.getMonth() + 0) > 9 ? "-" : "-0") +
    Number(date.getMonth() + 0) +
    "-" +
    date.getFullYear();
  return result.toString();
}

function renderResNext(first, cycle, count, sundays) {
  function renderNext(next_installment) {
    let day = next_installment.split("-")[0];
    let month = next_installment.split("-")[1];
    let year = next_installment.split("-")[2];
    const date = new Date(year, month, day);

    cycle === "days"
      ? date.setDate(date.getDay() === 0 ? (sundays > 0 ? date.getDate() + 2 : date.getDate() + 1) : date.getDate() + 1)
      : cycle === "weeks"
      ? date.setDate(date.getDate() + 7)
      : date.setDate(date.getDate() + 30);
    // ? date.setDate(date.getDate() + (Number(count) <= 1 ? 1 : 7))
    // : date.setDate(date.getDate() + (Number(count) <= 1 ? 1 : 30));
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      (date.getDate()) +
      (Number(date.getMonth() + 0) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 0) +
      "-" +
      date.getFullYear();
    return result.toString();
  }

  let second = renderNext(first).toString();
  let third = renderNext(second).toString();
  let fourth = renderNext(third).toString();

  let result = [];
  let next_first = first;
  let next_second = second;
  let next_third = third;
  let next_fourth = fourth;
  result.push({
    res_next_first: next_first,
    res_next_second: next_second,
    res_next_third: next_third,
    res_next_fourth: next_fourth,
  });
  return result;
}

function renderDateNumber(date_value) {
  let date_number = "";
  if (date_value) {
    let day = date_value.split("-")[0];
    let month = date_value.split("-")[1];
    let year = date_value.split("-")[2];
    const date = new Date(year, month, day);
    date_number =
      date.getFullYear() +
      "" +
      (Number(date.getMonth()) > 9 ? "" : "0") +
      Number(date.getMonth()) +
      "" +
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate();
    return date_number;
  }
  return date_number;
}

export function renderNextInstallmentDate(
  sundays,
  first,
  previous,
  next,
  cycle,
  count,
  payment_day,
  paymentDay,
  payment_status,
  current
) {
  const params = [
    { name: "sundays", value: sundays },
    { name: "first", value: first },
    { name: "previ", value: previous },
    { name: "cycle", value: cycle },
    { name: "count", value: count },
    { name: "p_day", value: payment_day },
    { name: "pay_d", value: paymentDay },
    { name: "p_sts", value: payment_status },
    { name: "curre", value: current },
    { name: "next", value: next },
  ];
  function renderNext(next_installment) {
    if (!next_installment) return null;
    let day = next_installment.split("-")[0];
    let month = next_installment.split("-")[1];
    let year = next_installment.split("-")[2];
    const date = new Date(year, month, day);

    // TODO: Check if Skipping Sundays
    cycle === "days"
      ? date.setDate(date.getDay() === 0 ? (sundays > 0 ? date.getDate() + 2 : date.getDate() + 1) : date.getDate() + 1)
      : cycle === "weeks"
      ? date.setDate(date.getDate() + 7)
      : date.setDate(date.getDate() + 30);
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      (date.getDate()) +
      (Number(date.getMonth() + 0) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 0) +
      "-" +
      date.getFullYear();
    return result.toString();
  }
  let next_first = renderNext(next);
  let next_second = renderNext(next_first);
  let next_third = renderNext(next_second);
  let next_fourth = renderNext(next_third);

  const next_dates = [
    { name: "next_first", value: next_first },
    { name: "next_second", value: next_second },
    { name: "next_third", value: next_third },
    { name: "next_fourth", value: next_fourth },
  ];

  function renderNextDate(present, next, first, second, third) {
    if (present === "before") return next;
    if (present === "previous") return first;
    if (present === "between") return first;
    if (present === "next") return second;
    if (present === "after") return second;
    return third;
  }

  const result = renderNextDate(
    payment_day,
    next,
    next_first,
    next_second,
    next_third
  );

  // console.groupCollapsed("Next Installment");
  // console.table(params);
  // console.table(next_dates);
  // console.log(result);
  // console.groupEnd();

  return result;
}
