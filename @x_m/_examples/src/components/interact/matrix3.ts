export class Matrix3 {
  elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]

  set(
    n11: number,
    n12: number,
    n13: number,
    n21: number,
    n22: number,
    n23: number,
    n31: number,
    n32: number,
    n33: number
  ) {
    const te = this.elements

    te[0] = n11
    te[1] = n12
    te[2] = n13
    te[3] = n21
    te[4] = n22
    te[5] = n23
    te[6] = n31
    te[7] = n32
    te[8] = n33

    return this
  }

  get cssElement() {
    const { elements } = this
    return [
      elements[0],
      elements[1],
      elements[3],
      elements[4],
      elements[6],
      elements[7],
    ]
  }

  multiply(m: Matrix3) {
    return this.multiplyMatrices(this, m)
  }

  multiplyMatrices(a: Matrix3, b: Matrix3) {
    const ae = a.elements
    const be = b.elements
    const te = this.elements

    const a11 = ae[0]
    const a12 = ae[3]
    const a13 = ae[6]
    const a21 = ae[1]
    const a22 = ae[4]
    const a23 = ae[7]
    const a31 = ae[2]
    const a32 = ae[5]
    const a33 = ae[8]

    const b11 = be[0]
    const b12 = be[3]
    const b13 = be[6]
    const b21 = be[1]
    const b22 = be[4]
    const b23 = be[7]
    const b31 = be[2]
    const b32 = be[5]
    const b33 = be[8]

    te[0] = a11 * b11 + a12 * b21 + a13 * b31
    te[3] = a11 * b12 + a12 * b22 + a13 * b32
    te[6] = a11 * b13 + a12 * b23 + a13 * b33

    te[1] = a21 * b11 + a22 * b21 + a23 * b31
    te[4] = a21 * b12 + a22 * b22 + a23 * b32
    te[7] = a21 * b13 + a22 * b23 + a23 * b33

    te[2] = a31 * b11 + a32 * b21 + a33 * b31
    te[5] = a31 * b12 + a32 * b22 + a33 * b32
    te[8] = a31 * b13 + a32 * b23 + a33 * b33

    return this
  }

  scale(sx: number, sy: number) {
    const te = this.elements

    te[0] *= sx
    te[3] *= sx
    te[6] *= sx
    te[1] *= sy
    te[4] *= sy
    te[7] *= sy

    return this
  }

  rotate(theta: number) {
    const c = Math.cos(theta)
    const s = Math.sin(theta)

    const te = this.elements

    const a11 = te[0]
    const a12 = te[3]
    const a13 = te[6]
    const a21 = te[1]
    const a22 = te[4]
    const a23 = te[7]

    te[0] = c * a11 + s * a21
    te[3] = c * a12 + s * a22
    te[6] = c * a13 + s * a23

    te[1] = -s * a11 + c * a21
    te[4] = -s * a12 + c * a22
    te[7] = -s * a13 + c * a23

    return this
  }

  translate(tx: number, ty: number) {
    const te = this.elements

    te[0] += tx * te[2]
    te[3] += tx * te[5]
    te[6] += tx * te[8]
    te[1] += ty * te[2]
    te[4] += ty * te[5]
    te[7] += ty * te[8]

    return this
  }

  fromArray(array: number[], offset = 0) {
    for (let i = 0; i < 9; i += 1) {
      this.elements[i] = array[i + offset]
    }

    return this
  }

  toArray(array: number[] = [], offset = 0) {
    const te = this.elements

    for (let i = 0; i <= 8; i += 1) {
      // eslint-disable-next-line no-param-reassign
      array[offset + i] = te[i]
    }

    return array
  }
}
