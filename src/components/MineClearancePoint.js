import PropTypes from 'prop-types';
import {
    MINE_STATUS_CLOSE,
    MINE_STATUS_OPEN,
    MINE_STATUS_MARKED,
    IS_MINE
} from '../utils/mine-constants';


function handleMouseDown(event, onLeftClick, onRightClick) {
    if (event.button == 1) {
        onLeftClick;
    } else if (event.button == 2) {
        onRightClick;
    }
}

const MineClearancePoint = ({ onLeftClick, onRightClick, onDoubleClick, point }) => {

    let bgColor = '#123456';
    let showNum = false;
    let showBoom = false;
    if (point.status == MINE_STATUS_CLOSE) {
        bgColor = '#123456';
    } else if (point.status == MINE_STATUS_MARKED) {
        bgColor = '#223456';
    } else if (point.status == MINE_STATUS_OPEN) {
        showNum = point.value != IS_MINE && point != 0;
        showBoom = point.value == IS_MINE;
    }

    return (
        <span
            style={{ width: 10, height: 10, backgroundColor: bgColor }}
            onDoubleClick={() => onDoubleClick(point.index)}
            onMouseDown={handleMouseDown(event, () => onLeftClick(point.index), () => onRightClick(point.index))}>
            {showNum ? point.value : null}
            {showBoom ? 'x' : null}
        </span>
    );
};

ProductList.propTypes = {
    onLeftClick: PropTypes.func.isRequired,
    onRightClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    point: PropTypes.object.isRequired,
};

export default MineClearancePoint;